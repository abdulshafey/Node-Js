// Import Express framework
const express = require("express")
// Import book controller functions
const { getAllBooks, getBookById, createBook, deleteBook } = require("../controllers/books")

// Create a new Express Router instance
// Routers allow you to modularize route handling
const router = express.Router()

// ==========================
// GET all books
// Route: GET /books
// Description: Fetches all books from the database
// ==========================
router.get('/', getAllBooks)

// ==========================
// GET book by ID
// Route: GET /books/:id
// Description: Fetch a single book by its UUID
// Flow: Request -> optional middleware -> controller function
// ==========================
router.get("/:id", getBookById)

// ==========================
// POST (Create) a new book
// Route: POST /books
// Description: Add a new book to the database
// ==========================
router.post("/", createBook)

// ==========================
// DELETE a book by ID
// Route: DELETE /books/:id
// Description: Delete a book from the database by its UUID
// ==========================
router.delete("/:id", deleteBook)

// Export the router to use it in the main Express app
module.exports = router
