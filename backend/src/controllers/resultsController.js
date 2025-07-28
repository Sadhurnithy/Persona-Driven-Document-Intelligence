const { analysisResults } = require('./analyzeController');

exports.handleGetResults = async (req, res, next) => {
  try {
    const { analysisId } = req.params;
    const result = analysisResults[analysisId];

    if (!result) {
      return res.status(404).json({ error: 'Analysis not found.' });
    }
    
    res.status(200).json(result);

  } catch (err) {
    next(err);
  }
};