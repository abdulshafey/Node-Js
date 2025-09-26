// Import the required types and functions from Drizzle ORM PostgreSQL core
// - pgTable: defines a table
// - varchar: variable-length string column
// - text: long text column (not used here but available)
// - uuid: universally unique identifier type for primary keys
const { pgTable, varchar, text, uuid } = require("drizzle-orm/pg-core")

// Define the 'authors' table
const authorTable = pgTable("authors", {
    // 'id' column: UUID, primary key, automatically generated if not provided
    id: uuid().primaryKey().defaultRandom(),

    // 'firstName' column: string with max length 55, required
    firstName: varchar({ length: 55 }).notNull(),

    // 'lastName' column: string with max length 55, optional
    lastName: varchar({ length: 55 }),

    // 'email' column: string with max length 55, required, unique
    email: varchar({ length: 55 }).notNull().unique()
})

// Export the table so it can be used in database queries and relationships
module.exports = authorTable
