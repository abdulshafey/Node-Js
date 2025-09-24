📘 Notes: Application Development – Databases, ORM & Drizzle

🔹 Client & Server Basics

Client: Anything that interacts with the server (browser, mobile app, IoT device, etc.).
Server: Built using Node.js (Express), receives requests, processes them, and returns responses.
Request Processing may include:
Fetching/updating database
Using cache store (e.g., Redis)
Logging/monitoring (e.g., OpenTelemetry)
Sending external API calls (emails, notifications, etc.)
👉 A single request may touch multiple services before responding.

🔹 Database Overview
Database = Storage system for application data (users, posts, comments, likes, settings, etc.).
Critical for backend engineers → Must know how to model and interact with databases properly.

🔹 Types of Databases
SQL Databases (Relational)
Structured data with relationships.
Data integrity is enforced at the database level.
Example schema:
Users(id, name, email, password, profile_image)
Friends(user1_id, user2_id)
Supports relations:
One-to-Many (One user can have many friends)
Many-to-Many (Users can be in multiple groups, etc.)
Example DBs: Postgres, MySQL, Oracle, SQL Server

✅ Pros: Strong structure, automatic validation, avoids invalid data.
NoSQL Databases (Non-Relational)
Flexible, schema-less (can store any key-value pairs).
Example:
{
"id": 1,
"name": "A",
"friends": ["B", "C"],
"gender": "male"
}
No strict schema → Application must enforce validation.
Example DBs: MongoDB, CouchDB, Cassandra, DynamoDB
✅ Pros: Flexible, fast prototyping.
❌ Cons: Easy to insert inconsistent/invalid data.

🔹 Relational Example (Friends in SQL)
Users Table: Stores user info.
Friends Table: Stores relations.
A = Friend of B
A = Friend of C

✅ Allows querying:
"How many friends does A have?"
"Who are mutual friends of B & C?"
Database ensures no duplicate or invalid friendships.

🔹 NoSQL Example (Friends in MongoDB)
Store friendships directly inside user document as array:
{ "id": 1, "name": "A", "friends": ["B", "C"] }
Can insert invalid friend (e.g., "Z" even if no user exists).
Must validate data in application layer.

🔹 Key Differences
Feature | SQL (Relational) | NoSQL (Non-Relational)
Structure | Rigid, schema-based | Flexible, schema-less
Relationships | Tables & foreign keys | Arrays/embedded documents
Validation | Enforced by DB | Enforced by application
Examples | Postgres, MySQL | MongoDB, DynamoDB

🔹 Course Decision
Focus on SQL / Relational Database (Postgres) because:
Widely used in real-world applications.
Harder to learn than NoSQL, but once mastered → NoSQL is easy.
Prepares you for enterprise-level backend development.

////////////////////////////////////////////////////////////////////////////////

📘 Notes on ORM (Object-Relational Mapping)

What is an ORM?

- ORM stands for Object Relational Mapping (sometimes Object Relation
  Mapper).
- It is a software layer that translates between:
  - Data representation used by databases (SQL, tables, etc.)
  - Data representation in object-oriented programming (objects,
    classes).

Analogy (Human ↔ Blind/Deaf Person Communication)

- You speak Hindi → but a blind & deaf person cannot understand
  directly.
- Middle layer (software) translates Hindi → Braille → back to Hindi.
- ORM = Middle layer that enables communication between two different
  “languages.”

Example with JavaScript & Postgres

- In JS:
  const user = { id: 1, name: "Abdul" }
- Directly sending this to Postgres is not possible.

- Postgres understands SQL:
  INSERT INTO users (id, name) VALUES (1, 'Abdul');
- ORM converts JS object → SQL query.

- Similarly, when fetching:
  - Query: SELECT \* FROM users WHERE id = 1;
  - Result (tabular) → ORM → { id: 1, name: "Abdul" } (JS object).

Why Use ORM?

- Developer works with familiar objects.
- Database works with SQL/tabular data.
- ORM bridges the gap → automatic conversion.

Examples of ORMs

- JavaScript → Postgres/MySQL → Drizzle
- JavaScript → MongoDB → Mongoose
- Python → Postgres → SQLAlchemy
- Python → MongoDB → PyMongo
- JavaScript → Multiple DBs (Postgres, MySQL, MongoDB, etc.) → Prisma

Summary

- ORM is a translator layer between programming language objects and
  databases.
- It allows developers to use objects instead of writing raw queries.
- Each programming language has specific ORMs for different databases.
