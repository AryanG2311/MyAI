const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const geminiroute = require("./routes/geminiroute");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// Middleware
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.json()); // For parsing JSON bodies
app.use(express.static("public")); // Serve static files

// Initialize the AI client
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Home route
app.get('/', (req, res) => {
  res.send('Local host working');
});

// app.use("/",openairoute);


// Endpoint to get AI response
app.use("/",geminiroute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.log('Some error occurred:', err);
  // res.render('error.ejs');
  next();
});

// Error page route
app.get('/error404', (req, res) => {
  res.render('error.ejs');
});

// Starting the server
const port = 2424;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
