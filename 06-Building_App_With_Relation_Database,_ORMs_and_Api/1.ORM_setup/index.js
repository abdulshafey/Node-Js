// Import the database connection instance (db)
// This was set up in db/index.js using drizzle-orm with Postgres
const db = require("./db/index.js")

// Import the schema definition for the "users" table
// This is the table structure you created in drizzle/schema.js
const { usersTable } = require("./drizzle/schema.js")


// Function to fetch all users from the "users" table
async function getAllUsers() {
    // Build & execute a SELECT * query on the users table
    // drizzle automatically generates safe SQL behind the scenes
    const users = await db.select().from(usersTable)

    // Print all users to console
    console.log(users);

    // Return the result to the caller
    return users
}


// Function to create (insert) a new user into the "users" table
async function createUser({ id, name, email }) {
    // Insert a new record into users table
    // drizzle automatically converts this into SQL:
    // INSERT INTO users (id, name, email) VALUES (...)
    const user = await db.insert(usersTable).values({ id, name, email })

    // Confirmation message
    console.log("User created successfully", user);
}


// --- USAGE EXAMPLES ---
// Uncomment these lines to insert sample users
// createUser({ id: 1, name: "John doe", email: "jdoe@gmail.com" })
// createUser({ id: 2, name: "Alice", email: "alice@gmail.com" })

// Fetch and log all users from database
getAllUsers()
