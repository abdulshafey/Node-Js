// Import the 'drizzle' function from Drizzle ORM PostgreSQL adapter
// This function is used to create a database connection instance
const { drizzle } = require("drizzle-orm/node-postgres")

// Load environment variables from the .env file
// This allows us to access DATABASE_URL securely without hardcoding it
require("dotenv/config")

// Create a Drizzle ORM database instance using the connection string
// process.env.DATABASE_URL should be in the format:
// postgres://username:password@host:port/database
const db = drizzle(process.env.DATABASE_URL)

// Export the database instance so it can be used across the app
module.exports = db
