const { v4: uuidv4 } = require('uuid');
const pdfService = require('../services/pdfService');

// In-memory storage for results
const analysisResults = {};

exports.handleAnalyze = async (req, res, next) => {
    try {
        const files = req.files;
        const persona = req.body?.persona;
        const jobToBeDone = req.body?.job_to_be_done;

        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No PDF files uploaded.' });
        }
        if (!persona) {
            return res.status(400).json({ error: 'Persona is required.' });
        }
        if (!jobToBeDone || jobToBeDone.trim() === '') {
            return res.status(400).json({ error: 'job_to_be_done is required.' });
        }
        
        console.log(`Starting analysis for persona "${persona}"...`);
        const startTime = Date.now();

        const { extracted_sections, subsection_analysis } = await pdfService.findTopSectionsAndSubsections(
            files,
            persona,
            jobToBeDone
        );

        const processingTime = (Date.now() - startTime) / 1000;
        console.log(`Analysis complete in ${processingTime.toFixed(2)} seconds.`);

        const analysisId = uuidv4();
        const result = {
            metadata: {
                input_documents: files.map(f => f.originalname),
                persona,
                job_to_be_done: jobToBeDone,
                processing_timestamp: new Date().toISOString(),
            },
            extracted_sections,
            subsection_analysis
        };

        analysisResults[analysisId] = result;
        
        res.status(202).json({ 
            analysisId: analysisId,
            message: "Analysis started. Use the analysisId to fetch the result." 
        });

    } catch (err) {
        next(err);
    }
};

// Export storage so other modules (like resultsController) can access it.
exports.analysisResults = analysisResults;