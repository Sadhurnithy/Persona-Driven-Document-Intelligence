const express = require('express');
const analyzeRouter = require('./routes/analyze');
const resultsRouter = require('./routes/results');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/analyze', analyzeRouter);
app.use('/api/results', resultsRouter);

// Generic Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An internal server error occurred.' });
});

module.exports = app;