// Import column types and helpers from Drizzle ORM's Postgres core
// - pgTable → used to define a table
// - varchar → defines a variable-length string column
// - integer → defines an integer column
const { pgTable, varchar, integer } = require("drizzle-orm/pg-core")

// Define the "users" table schema
// - First argument: actual table name in Postgres ("users")
// - Second argument: object with column definitions
const usersTable = pgTable("users", {
    // "id" column → integer type, primary key (unique identifier for each row)
    id: integer().primaryKey(),

    // "name" column → varchar with max length 255, cannot be null
    name: varchar({ length: 255 }).notNull(),

    // "email" column → varchar with max length 255, cannot be null
    email: varchar({ length: 255 }).notNull()
})

// Export the table schema so it can be used in queries
// Example: const { usersTable } = require("./schema")
module.exports = {
    usersTable
}
