# Bookstore Application: Migration to PostgreSQL with Drizzle ORM

## Overview

We are migrating the existing bookstore application from using an **in-memory database** to a **real PostgreSQL database** using **Drizzle ORM**.

**Problem with current setup:**

- Data is stored in-memory arrays.
- Data is lost on server restart.

**Solution:**

- Use PostgreSQL as the database.
- Use Drizzle ORM for database interactions.

---

## 1. Setup PostgreSQL with Docker

**docker-compose.yml example:**

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:17.4
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: bookstore
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: admin

Notes:
Ensure no container is running on port 5432.
Optionally, map to another port (e.g., 5431) if needed.

2. Install Dependencies
npm install dotenv drizzle-orm pg drizzle-kit
dotenv → Load environment variables.

drizzle-orm → ORM for DB operations.

pg → PostgreSQL driver.

drizzle-kit → Drizzle CLI and tools.

3. Configure Environment Variables
Create .env file:

DATABASE_URL=postgres://postgres:admin@localhost:5432/bookstore
Load .env in your app:

require('dotenv').config();
4. Project Structure

/drizzle
  ├── db
  │   ├── index.js      # Database connection
  │   └── schema
  │       ├── book.model.js
  │       └── author.model.js


5. Database Connection (db/index.js)
const { drizzle } = require('drizzle-orm/node-postgres');
require('dotenv').config();

const db = drizzle(process.env.DATABASE_URL);

module.exports = db;

6. Define Models
Author Model (author.model.js)

const { pgTable, serial, varchar, text, uuid } = require('drizzle-orm/pg-core');

const authorsTable = pgTable('authors', {
  id: uuid('id').primaryKey().defaultRandom(),
  first_name: varchar('first_name', { length: 55 }).notNull(),
  last_name: varchar('last_name', { length: 55 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  profile_image: varchar('profile_image', { length: 255 })
});

module.exports = authorsTable;
Book Model (book.model.js)

const { pgTable, varchar, text, uuid } = require('drizzle-orm/pg-core');
const authorsTable = require('./author.model');

const booksTable = pgTable('books', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 100 }).notNull(),
  description: text('description'),
  author_id: uuid('author_id')
    .references(() => authorsTable.id)
    .notNull()
});

module.exports = booksTable;
Notes:

author_id establishes a foreign key relationship with authorsTable.
One author → many books (1:N relationship).

7. Drizzle Config (drizzle.config.js)
require('dotenv').config();
const { defineConfig } = require('drizzle-kit');

module.exports = defineConfig({
  schema: './drizzle/db/models/index.js',
  out: './drizzle/db/migrations',
  driver: 'pg',
  dbCredentials: process.env.DATABASE_URL,
});
Export all models from models/index.js.

8. Push Schema to Database
bash
Copy code
docker-compose up -d
npx drizzle-kit studio
npx drizzle-kit push
Verify authors and books tables exist in Drizzle Studio.

Create sample authors and books to test relationships.

9. Update Controllers
Get all books

const books = await db.select().from(booksTable);
res.json(books);
Get book by ID


const { eq } = require('drizzle-orm');
const [book] = await db.select().from(booksTable).where(eq(booksTable.id, id)).limit(1);
if (!book) return res.status(404).json({ message: 'Book not found' });
res.json(book);
Create book



const [result] = await db.insert(booksTable).values({
  title,
  description,
  author_id
}).returning({ id: booksTable.id });

res.json({ message: 'Book created', id: result.id });

Delete book

await db.delete().from(booksTable).where(eq(booksTable.id, id));
res.json({ message: 'Book deleted' });

10. Next Steps
Create author controllers and routes.
Test API using Thunderclient or Postman.
Ensure relational integrity: a book cannot be created without a valid author.

Key Takeaways

Drizzle ORM + PostgreSQL replaces in-memory DB.
UUIDs ensure unique identifiers.
Foreign keys enforce one-to-many relationships.
Asynchronous operations with await handle DB queries.
Environment variables secure DB credentials.
```
