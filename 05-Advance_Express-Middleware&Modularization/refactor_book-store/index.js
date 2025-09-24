// Import Express framework
const express = require("express");
const router = require("./routes/book.route.js");
const loggerMiddleware = require("./middleware/logger.js");


// Create an Express application
const app = express()



// ==========================
// Global Middleware
// ==========================
// express.json() middleware parses incoming JSON request bodies
// Without this, req.body would be undefined for JSON requests
app.use(express.json())

// Register custom logger middleware globally
// This means it will run for ALL routes
app.use(loggerMiddleware)


//Route
app.use("/books", router)

// ==========================
// Start server
// ==========================
app.listen(8000, () => console.log("Server is running on port 8000"))
