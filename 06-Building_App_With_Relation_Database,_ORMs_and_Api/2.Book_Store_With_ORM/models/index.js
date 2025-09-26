// Import the book table model
const bookTable = require("./book.js")
// Import the author table model
const authorTable = require("./author.js")

// Export all table models as a single object
// This allows importing all models easily elsewhere in the app
module.exports = {
    bookTable,
    authorTable
}
