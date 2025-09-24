// Import the 'express' framework.
// Express is a lightweight web framework for Node.js that simplifies
// server creation, routing, and handling requests/responses.
// Instead of manually using 'http' and switch statements, Express provides
// clean methods like app.get(), app.post(), etc.
const express = require('express')

// Create an instance of an Express application
// This 'app' object is like your server instance.
const app = express()

// Define a GET route for "/" (homepage)
// req = request object, res = response object
app.get("/", async (req, res) => {
    // Log the full request object (for debugging, shows headers, method, etc.)
    console.log(req);

    // Send a text response back to the client
    return res.send("Hello from server ⏿").status(200)
})

// Define a GET route for "/contact-us"
app.get("/contact-us", (req, res) => {
    // Send contact details in the response
    return res.send("Sure, Email: abdulshafey25@gmail.com and Phone: +91 99999 99999")
})

// Define a GET route for "/tweet"
// (Imagine this would fetch tweets from a database in real apps)
app.get("/tweet", (req, res) => {
    return res.send("See all tweets")
})

// Define a POST route for "/tweet"
// This is used to "create" new tweets
app.post("/tweet", (req, res) => {
    // Set status to 201 (Created) and end the response
    return res.status(201).end("Your tweet was created")
})

// Start the server on port 8000
// Express handles all the request/response cycle internally,
// so we don’t need to write res.writeHead(), res.end(), etc.
app.listen(8000, () => console.log("Server is running on port 8000"))
