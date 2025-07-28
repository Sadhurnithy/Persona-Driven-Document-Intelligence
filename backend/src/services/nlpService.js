// Singleton class for the feature extraction pipeline (embedding model)
class EmbeddingPipeline {
  static instance = null;
  static async getInstance() {
      if (this.instance === null) {
          const { pipeline } = await import('@xenova/transformers');
          this.instance = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
      }
      return this.instance;
  }
}

/**
* Calculates the semantic embedding for a given text.
*/
async function getEmbedding(text) {
  const extractor = await EmbeddingPipeline.getInstance();
  const output = await extractor(text, { pooling: 'mean', normalize: true });
  return output.data;
}

/**
* Calculates the cosine similarity between two embeddings.
*/
async function calculateSimilarity(emb1, emb2) {
  const { cos_sim } = await import('@xenova/transformers');
  return cos_sim(emb1, emb2);
}

// Removed: summarizeText, extractKeySentences, generateQuestions and SummarizationPipeline
// are intentionally not included here to meet performance constraints.

module.exports = {
  getEmbedding,
  calculateSimilarity,
};