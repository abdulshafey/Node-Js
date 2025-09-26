// Import the book table model
const bookTable = require("../models/book.js")
// Import the database connection
const db = require("../db/index.js")
// Import the 'eq' function from Drizzle ORM to create equality conditions in queries
const { eq } = require("drizzle-orm")

// Controller: Get all books
exports.getAllBooks = async (req, res) => {
    try {
        // Select all records from the books table
        const books = await db.select().from(bookTable)

        // Check if there are no books in the database
        if (books.length === 0) {
            // No books found → return 404
            return res.status(404).json({ message: "Books not found" })
        }

        // Return books with a 200 OK status
        return res.status(200).json(books)
    } catch (error) {
        // Log any database or server errors
        console.error("Error fetching books:", error)
        // Return 500 Internal Server Error
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

// Controller: Get a book by its ID
exports.getBookById = async (req, res) => {
    const id = req.params.id // Extract the book ID from the route parameters

    try {
        // Query the books table for a book with a matching ID
        // 'eq' is used to check equality
        const data = await db
            .select()
            .from(bookTable)
            .where((table) => eq(table.id, id))
            .limit(1) // Limit to 1 record, since IDs are unique

        // Check if no book was found
        if (!data || data.length === 0) {
            return res.status(404).json({ error: `Book with id ${id} does not exist` })
        }

        // Return the found book with a 200 OK status
        return res.status(200).json(data[0]) // data is an array, return the first element
    } catch (error) {
        console.error("Error fetching book by ID:", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

// Controller: Create a new book
exports.createBook = async (req, res) => {
    const { title, description, authorId } = req.body // Extract data from request body

    // Validate title (required field)
    if (!title || title.trim() === '') {
        return res.status(400).json({ error: "Title is required" })
    }

    try {
        // Insert a new book into the books table
        // returning() ensures we get the ID of the newly created book
        const [result] = await db.insert(bookTable).values({
            title,
            description,
            authorId // ✅ Matches your table definition
        }).returning({
            id: bookTable.id
        })

        // Respond with 201 Created and the new book's ID
        return res.status(201).json({ message: "Book created successfully", id: result.id })
    } catch (error) {
        console.error("Error creating book:", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

// Controller: Delete a book by its ID
exports.deleteBook = async (req, res) => {
    const id = req.params.id // Extract the book ID from route parameters

    try {
        // Delete the book where the ID matches
        await db.delete(bookTable).where(eq(bookTable.id, id))

        // Return a success message
        res.status(200).json({ message: "Book deleted successfully" })
    } catch (error) {
        console.error("Error deleting book:", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}
