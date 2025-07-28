# Persona-Driven Document Intelligence: Approach Explanation

Our system is designed as an intelligent document analyst that extracts and prioritizes the most relevant sections from a document collection based on a user's professional persona and their specific job-to-be-done. The core of our approach is a robust, scalable, and highly performant architecture that combines a knowledge base of professional roles with state-of-the-art semantic search, all while strictly adhering to CPU-only, no-internet, and strict time constraints.

### Core Architecture

The system is a Node.js application built with the Express framework, containerized using Docker. The architecture's central principle is the separation of the generic processing engine from the domain-specific knowledge, which makes the solution both powerful and easily extensible. The main components are:

1.  **PDF Processing Service:** Uses the `pdf-parse` library to extract raw text content from each page of the uploaded PDF documents.
2.  **NLP Service:** Leverages the lightweight yet powerful `Xenova/all-MiniLM-L6-v2` sentence-transformer model for all AI operations. This model excels at converting text into numerical vectors (embeddings) that capture semantic meaning.
3.  **Persona Knowledge Base:** A simple yet powerful configuration file (`personaConfig.js`) that defines the key topics of interest for various professional personas.

### Methodology: Persona-Topic Mapping & Semantic Search

Our methodology is a three-stage process designed for speed, relevance, and quality:

**1. Knowledge-Driven Topic Identification:** Instead of attempting to heuristically guess section headings from varied PDF layouts—an approach that proved brittle—our system first consults the `personaConfig.js` knowledge base. For a given persona (e.g., "Travel Planner"), it retrieves a pre-defined list of relevant topics (e.g., "Nightlife and Entertainment," "Culinary Experiences"). This ensures the final `section_title` output is always meaningful, accurate, and directly aligned with the user's professional context.

**2. Document Chunking:** Each PDF in the collection is processed page by page. The text content is broken down into small, overlapping chunks of a few sentences each. This creates a comprehensive, searchable pool of all the granular information contained within the documents, without relying on unreliable visual structure.

**3. Semantic Search and Ranking:** This is the core of the intelligence. For each topic identified in step 1, the system performs a semantic search across the entire pool of text chunks from all documents. It calculates a relevance score by comparing the semantic embedding of the topic (using its title and keywords) with the embedding of each text chunk. The chunk with the highest similarity score is selected as the best representation of that topic. The final ranking of the extracted sections is determined by these similarity scores, ensuring the most relevant topics appear first. The `refined_text` is a concise, extractive summary snippet from this best-matching chunk.

This "Persona-Topic Mapping" approach is highly generic, as adding new personas only requires updating the configuration file, not the core logic. It guarantees high-quality outputs and meets all performance constraints by focusing the AI's power on fast, efficient semantic similarity calculations rather than slow, on-the-fly text generation.