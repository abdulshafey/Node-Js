// Import Node's built-in 'http' module to create an HTTP server
const http = require('node:http')

// Import Node's built-in 'fs' module to work with the file system (read/write logs)
const fs = require("node:fs")

// Create an HTTP server instance
const server = http.createServer((req, res) => {
    // Extract HTTP method (GET, POST, etc.) from the request
    const method = req.method

    // Extract requested path/route (like "/", "/contact-us", etc.)
    const path = req.url

    // Prepare a log string containing timestamp, method, and path
    const log = `\n [${Date.now()}: ${method} ${path}]`

    // Append the log entry to 'log.txt' file (sync method → blocks event loop briefly)
    // This way, every request is logged into the file.
    fs.appendFileSync("log.txt", log, "utf-8")

    // Handle requests based on HTTP method (GET, POST, etc.)
    switch (method) {
        case "GET":
            // Nested switch to handle GET requests by route
            switch (path) {
                case "/":
                    // Return HTTP 200 (OK) with homepage message
                    return res.writeHead(200).end("Hello from server ⏿")
                case "/contact-us":
                    // Return HTTP 200 with contact info
                    return res.writeHead(200).end("Sure, Email: abdulshafey25@gmail.com and Phone: +91 99999 99999")
                case "/tweet":
                    // Return HTTP 200 with tweet data
                    return res.writeHead(200).end("See all tweets")
            }
            break;

        case "POST":
            // Nested switch to handle POST requests
            switch (path) {
                case "/tweet":
                    // Return HTTP 201 (Created) confirming new tweet
                    return res.writeHead(201).end("Your tweet was created")
            }

        default:
            // Fallback if route or method is not handled
            // Return HTTP 404 (Not Found)
            return res.writeHead(404).end("Page not found!")
    }
})

// Start the server on port 8000
// Callback runs once when server starts successfully
server.listen(8000, () => console.log("Server running on port 8000"))
