// Import defineConfig helper from drizzle-kit
// drizzle-kit is used for migrations & schema syncing (CLI tool)
const { defineConfig } = require("drizzle-kit")

// Define and export the configuration for Drizzle ORM
// This tells drizzle-kit how to connect to the database and
// where to find schemas/migrations
const config = defineConfig({
    // Dialect: which SQL database we are using
    // Options: "postgresql", "mysql", "sqlite"
    dialect: "postgresql",

    // "out": folder where migration files will be generated
    // Example: SQL migration files will go inside ./drizzle
    out: "./drizzle",

    // "schema": path to your schema definition file
    // This file contains table definitions using drizzle-orm/pg-core
    schema: "./drizzle/schema.js",

    // Database connection credentials
    dbCredentials: {
        // Connection URL format:
        // postgres://<username>:<password>@<host>:<port>/<database>
        // ⚠️ NOTE: You had a typo → use "postgres" not "postgress"
        url: "postgres://admin:admin@localhost:5432/mydb"
    }
})

// Export the config so drizzle CLI can read it
module.exports = config
