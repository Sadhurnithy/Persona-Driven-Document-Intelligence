const pdfParse = require('pdf-parse');
const nlpService = require('./nlpService');
const { personaTopics } = require('../config/personaConfig');

/**
 * Extracts raw text from a PDF, page by page.
 */
async function extractTextByPage(buffer) {
    const data = await pdfParse(buffer);
    return data.text.split(/\f/g); // Split by form feed character to get pages
}

/**
 * Chunks text into overlapping paragraphs for better semantic matching.
 */
function createOverlappingChunks(text) {
    const sentences = text.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
    const chunks = [];
    const chunkSize = 4; // Number of sentences per chunk
    const overlap = 1;   // Number of sentences to overlap

    for (let i = 0; i < sentences.length; i += (chunkSize - overlap)) {
        const chunk = sentences.slice(i, i + chunkSize).join(' ').trim();
        if (chunk.length > 50) { // Only consider chunks with meaningful length
            chunks.push(chunk);
        }
    }
    return chunks;
}

/**
 * Main intelligence function using the Persona-Topic Mapping strategy.
 */
async function findTopSectionsAndSubsections(documents, persona, jobToBeDone) {
    console.log("Starting analysis with DEFINITIVE Persona-Topic Mapping strategy...");

    const query = `${persona}: ${jobToBeDone}`;
    const queryEmbedding = await nlpService.getEmbedding(query);

    // 1. Get the relevant topics for the given persona
    const topics = personaTopics[persona] || personaTopics['Travel Planner']; // Fallback to a default
    if (!topics) {
        throw new Error(`Persona "${persona}" not configured.`);
    }

    // 2. Process all documents to create a searchable pool of text chunks
    const allChunks = [];
    for (const doc of documents) {
        console.log(`Chunking document: ${doc.originalname}`);
        try {
            const pages = await extractTextByPage(doc.buffer);
            pages.forEach((pageText, pageIndex) => {
                const pageChunks = createOverlappingChunks(pageText);
                pageChunks.forEach(chunkText => {
                    allChunks.push({
                        document: doc.originalname,
                        page_number: pageIndex + 1,
                        content: chunkText,
                    });
                });
            });
        } catch (err) {
            console.error(`Failed to process ${doc.originalname}:`, err);
        }
    }

    // 3. For each topic, find the best matching chunk from the entire pool
    const bestSections = [];
    for (const topic of topics) {
        const topicQuery = `${topic.title}. ${topic.keywords}`;
        const topicEmbedding = await nlpService.getEmbedding(topicQuery);

        let bestChunkForTopic = null;
        let maxScore = -1;

        for (const chunk of allChunks) {
            const chunkEmbedding = await nlpService.getEmbedding(chunk.content);
            // Combine topic similarity and overall query similarity for better ranking
            const topicScore = await nlpService.calculateSimilarity(topicEmbedding, chunkEmbedding);
            const queryScore = await nlpService.calculateSimilarity(queryEmbedding, chunkEmbedding);
            const combinedScore = (topicScore * 0.7) + (queryScore * 0.3); // Weight topic relevance higher

            if (combinedScore > maxScore) {
                maxScore = combinedScore;
                bestChunkForTopic = chunk;
            }
        }

        if (bestChunkForTopic && maxScore > 0.3) { // Use a relevance threshold
            bestSections.push({
                section_title: topic.title, // Use the high-quality predefined title
                refined_text: bestChunkForTopic.content, // The best matching content snippet
                document: bestChunkForTopic.document,
                page_number: bestChunkForTopic.page_number,
                importance_score: maxScore,
            });
        }
    }

    // 4. Sort the found sections by their importance score
    bestSections.sort((a, b) => b.importance_score - a.importance_score);

    // 5. Build the final output JSON
    const extracted_sections = bestSections.slice(0, 5).map((section, index) => ({
        document: section.document,
        section_title: section.section_title,
        importance_rank: index + 1,
        page_number: section.page_number,
    }));

    const subsection_analysis = bestSections.slice(0, 10).map(section => {
        // --- THIS IS THE CHANGE: Truncate refined_text to be more concise ---
        const wordLimit = 100; // Set a word limit for the snippet
        const words = section.refined_text.split(/\s+/);
        const truncatedText = words.slice(0, wordLimit).join(' ');
        const final_text = words.length > wordLimit ? truncatedText + '...' : truncatedText;

        return {
            document: section.document,
            refined_text: final_text,
            page_number: section.page_number,
        };
    });

    console.log("Analysis complete.");
    return {
        extracted_sections,
        subsection_analysis,
    };
}

module.exports = {
    findTopSectionsAndSubsections,
};