// routes/index.js
const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// Initialize the AI client
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


router.post('/api/get-response', async (req, res) => {
    try {
      const { prompt } = req.body; // Extract the prompt from the frontend request
  
      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing prompt.' });
      }
  
      console.log("Prompt received from frontend:", prompt); // Debugging
  
      // Call the model's generateContent method
      const result = await model.generateContent(prompt);
  
      // Log the full response for debugging
  
      // Extract and send the response back to the frontend
      const botResponse = result.response.text() || "Sorry, I couldn't generate a response.";
      res.json({ response: botResponse });
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      res.status(500).json({ error: 'Failed to fetch response from Gemini API.' });
    }
  });
  
  // Route for home page (EJS)
  router.get('/home', (req, res) => {
    res.render('main.ejs');
  });

  module.exports = router; // Ensure you are exporting the router
