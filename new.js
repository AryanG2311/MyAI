require('dotenv').config();  // Make sure dotenv is loaded

const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Use the environment variable
});

async function generateHaiku() {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'user', content: 'Write a haiku about AI.' },
        ],
      });
  
      console.log(response.choices[0].message.content);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.error("Quota exceeded. Please try again later.");
      } else {
        console.error("Error:", error.response ? error.response.data : error.message);
      }
    }
  }
  
  generateHaiku();
  