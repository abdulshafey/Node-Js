// Import the `drizzle` function from the Node.js Postgres driver of Drizzle ORM
// - Drizzle ORM is the library that helps us write queries in JS instead of raw SQL
const { drizzle } = require("drizzle-orm/node-postgres")

// Create a database connection using Drizzle
// Connection string format → postgres://<username>:<password>@<host>:<port>/<db_name>
// Example here:
//   - username = admin
//   - password = admin
//   - host = localhost (since DB is running locally in Docker or machine)
//   - port = 5432 (default Postgres port)
//   - db_name = mydb

const db = drizzle("postgres://admin:admin@localhost:5432/mydb")

// Export the `db` instance so it can be imported and used in other files
// Example usage: const db = require("./db")
module.exports = db
