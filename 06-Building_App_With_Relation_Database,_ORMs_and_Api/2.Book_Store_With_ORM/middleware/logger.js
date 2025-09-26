// Import Node's built-in File System (fs) module
// Used here to log request details into a file
const fs = require('node:fs')


// ==========================
// Custom Middleware: Logger
// ==========================
// This middleware logs every incoming request's timestamp, method, and path
// It writes the log into a file `log.txt` using fs.appendFileSync
// appendFileSync ensures the data is appended (not overwritten) synchronously
// After logging, it calls `next()` to pass control to the next middleware/route
const loggerMiddleware = (req, res, next) => {
    const log = `\n[${Date.now()}] ${req.method} ${req.path}`
    fs.appendFileSync("log.txt", log, "utf-8")
    next()
}

module.exports = loggerMiddleware