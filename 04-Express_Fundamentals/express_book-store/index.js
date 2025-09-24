// Import Express framework
const express = require("express")
const fs = require("node:fs")

// Create an Express application
const app = express()

// In-memory data store (Books list)
const books = [
    { id: 1, title: 'Book One', author: 'Author One' },
    { id: 2, title: 'Book Two', author: 'Author Two' },
];

// Middleware to parse incoming JSON requests
app.use(express.json())


// ==========================
// GET all books
// ==========================
app.get('/books', (req, res) => {
    if (books) {
        // Return all books with 200 OK
        return res.status(200).json(books)
    }
    // If books list is empty
    return res.status(404).json("Books not found")
})

// ==========================
// GET book by ID
// ==========================
app.get("/books/:id", (req, res) => {
    const id = Number(req.params.id) // Extract ID from params
    if (isNaN(id)) {
        // Validate ID type
        return res.status(400).json({ error: "id must be of type number" })
    }

    // Find book with matching ID
    const data = books.find((e) => e.id === id)
    if (!data) {
        // If book not found
        return res.status(404).json({ error: `Book with id ${id} does not exist` })
    }

    // Return the found book
    return res.status(200).json(data)
})

// ==========================
// POST (Create) a new book
// ==========================
app.post("/books", (req, res) => {
    const { title, author } = req.body

    // Validate title
    if (!title || title.trim() === '') {
        return res.status(400).json({ Error: "title is required" })
    }

    // Validate author
    if (!author || author.trim() === '') {
        return res.status(400).json({ Error: "author is required" })
    }

    // Generate new ID based on array length
    const id = books.length + 1
    const payload = { id, title, author }

    // Add new book to the array
    books.push(payload)

    // Return success response with new book ID
    return res.status(201).json({ message: "Book created successfully", id })
})

// ==========================
// DELETE a book by ID
// ==========================
app.delete("/books/:id", (req, res) => {
    const id = Number(req.params.id)

    if (isNaN(id)) {
        // Validate ID type
        return res.status(400).json({ error: "id must be of type number" })
    }

    // Find book index by ID
    const indexToDelete = books.findIndex((e) => e.id === id)
    if (indexToDelete < 0) {
        // If book not found
        return res.status(404).json({ error: `Book with id ${id} does not exist` })
    }

    // Remove book from array
    books.splice(indexToDelete, 1)

    // Success response
    res.status(200).json({ message: "Book deleted successfully" })
})

// ==========================
// Start server
// ==========================
app.listen(8000, () => console.log("Server is running on port 8000"))
