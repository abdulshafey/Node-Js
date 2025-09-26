// Import Express framework
const express = require("express");
// Import book routes
const router = require("./routes/book.route.js");
// Import custom logger middleware
const loggerMiddleware = require("./middleware/logger.js");
// Load environment variables from .env
require("dotenv/config");

// Create an Express application
const app = express();

// ==========================
// Global Middleware
// ==========================

// Middleware to parse incoming JSON request bodies
// Without this, req.body would be undefined for JSON requests
app.use(express.json());

// Register custom logger middleware globally
// This middleware will run for ALL routes and can be used for logging requests
app.use(loggerMiddleware);

// ==========================
// Routes
// ==========================

// Prefix all routes in book router with /books
// Example: GET /books will hit the getAllBooks route
app.use("/books", router);

// ==========================
// Start Server
// ==========================

// Start the Express server on port 8000
// The callback confirms the server is running
app.listen(8000, () => console.log("Server is running on port 8000"));
