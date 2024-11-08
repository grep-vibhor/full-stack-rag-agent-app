import { getAgentResponse } from './rag_agent.js';
import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());


// POST endpoint
app.post('/query', async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ 
                error: 'Query parameter is required in request body' 
            });
        }
        console.log(`Query Received: ${query}`)
        const response = await getAgentResponse(query);
        res.json({ response });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ 
            error: 'Internal server error' 
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something broke!'
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
