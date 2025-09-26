// Import necessary functions and types from Drizzle ORM PostgreSQL core
// - pgTable: defines a table
// - varchar: variable-length string column
// - text: long text column
// - uuid: universally unique identifier type
const { pgTable, varchar, text, uuid } = require("drizzle-orm/pg-core")

// Import the author table to establish a foreign key relationship
const authorTable = require("./author")

// Define the 'books' table
const bookTable = pgTable("books", {
    // 'id' column: UUID, primary key, auto-generated
    id: uuid().primaryKey().defaultRandom(),

    // 'title' column: string with max length 55, required
    title: varchar({ length: 55 }).notNull(),

    // 'description' column: text type, optional
    description: text(),

    // 'authorId' column: UUID, required
    // References 'id' column of 'authors' table → establishes one-to-many relationship
    authorId: uuid()
        .references(() => authorTable.id)
        .notNull()
})

// Export the books table for database operations
module.exports = bookTable
