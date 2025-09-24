// ==========================
// Custom Middleware: Example
// ==========================
// This middleware demonstrates how you can create reusable functions
// It runs only when explicitly passed in a route
// In this example, we are just logging a message to the console
// After finishing, it calls `next()` so the request continues
exports.customMiddleware = (req, res, next) => {
    console.log("I am a custom middleware");
    next()
}