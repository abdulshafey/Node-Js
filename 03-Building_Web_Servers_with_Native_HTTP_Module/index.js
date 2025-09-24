// Import the built-in 'http' module in Node.js
// This module allows us to create an HTTP server without using any external libraries.
const http = require('node:http');


// Create a new HTTP server instance.
// The callback function (req, res) runs every time a request hits the server.
const server = http.createServer((req, res) => {
    // Uncomment these logs if you want to debug and inspect requests:
    // console.log(`Incoming request at: ${Date.now()}`); // Logs timestamp of request
    // console.log("Header: ", req.headers); // Shows all request headers
    // console.log("Method: ", req.method);  // Logs HTTP method (GET, POST, etc.)
    // console.log("Body: ", req.body);    // (Not directly available in Node core HTTP, requires parsing for POST data)
    // console.log("Url: ", req.url);     // Logs the requested URL path (like "/", "/login")

    // Use switch-case to handle different routes based on req.url
    switch (req.url) {
        case "/":
            // Set status code 200 → OK
            res.writeHead(200);
            // Send response for homepage
            return res.end("homepage");

        case "/login":
            // Set status code 200 → OK
            res.writeHead(200);
            // Send response for login route
            return res.end("Please login first");

        case "/contact-us":
            // Set status code 200 → OK
            res.writeHead(200);
            // Send response for contact-us route
            return res.end("Thank You for contacting us ");

        default:
            // If none of the routes match, send a 404 → Not Found
            res.writeHead(404);
            return res.end("You're lost");
    }

    // Alternative way (not used here since switch handles responses):
    // res.writeHead(200);
    // res.end("Hello ")
});

// Start the server and make it listen on port 8000.
// Callback runs once when the server starts successfully.
server.listen(8000, () => console.log("Server running at http://localhost:8000"));