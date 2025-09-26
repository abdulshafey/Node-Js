// Import 'defineConfig' function from Drizzle Kit
// This is used to define the configuration for schema migrations
const { defineConfig } = require("drizzle-kit")

// Load environment variables from .env file
require("dotenv/config")

// Define the Drizzle Kit configuration
const config = defineConfig({
    // Output directory for generated migration and schema files
    out: "./drizzle",

    // Path to the schema file or index that exports all models
    // Drizzle will read this file to know the table definitions
    schema: "./models/index.js",

    // Database dialect (PostgreSQL in this case)
    dialect: "postgresql",

    // Database credentials
    dbCredentials: {
        // URL of the PostgreSQL database from .env
        url: process.env.DATABASE_URL
    }
})

// Export the configuration object
// Drizzle Kit CLI will use this when running migrations or generating schema
module.exports = config
