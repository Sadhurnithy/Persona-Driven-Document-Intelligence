// This script's sole purpose is to download and cache the embedding model during the Docker build.
(async () => {
  try {
    const { pipeline } = await import('@xenova/transformers');

    console.log('Caching feature-extraction model (all-MiniLM-L6-v2)...');
    await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    console.log('Feature-extraction model cached successfully.');

    // Removed: No longer caching the summarization model.

  } catch (err) {
    console.error('Failed to cache model:', err);
    process.exit(1);
  }
})();