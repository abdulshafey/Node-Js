📘 Notes on Express.js

🔹 What is Express.js?

Express.js is a minimal and flexible Node.js framework for building web applications and APIs.
It sits on top of Node’s built-in HTTP module and makes server development faster, cleaner, and more readable.

🔹 Why use Express?

No need to manually handle request URLs, headers, and response writing (like in http.createServer()).
Provides routing system (app.get, app.post, etc.).
Easy to manage middleware for logging, authentication, request parsing, etc.
Has a huge ecosystem of plugins (body-parser, cookie-parser, morgan, cors, etc.).
Used in real-world production apps (APIs, websites, microservices).

🔹 Core Features

Routing – Handle requests by HTTP method and path.
app.get("/home", (req, res) => res.send("Welcome!"))
app.post("/login", (req, res) => res.send("Login API"))

Middleware – Functions that run before reaching routes.
Example: logging, authentication, parsing JSON, etc.

app.use(express.json()); // Middleware to parse JSON body

Request & Response Objects
req → request data (headers, body, params, query, etc.).
res → response handler (send data, status codes, etc.).

Serving Static Files
app.use(express.static("public"));

Error Handling – Special middleware for centralized error handling.
app.use((err, req, res, next) => {
res.status(500).send("Something broke!");
});

🔹 Express App Lifecycle

Client sends a request (GET /contact-us).
Express matches it against defined routes (app.get("/contact-us")).
Middleware functions (if any) execute in order.
Matched route sends a response.

//////////////////////////////////////////////////////////////////////////////////////////////////////

📘 Semantic Versioning (SemVer) & package.json Notes
🔹 Understanding package.json
The package.json file in a Node.js project contains:
Project metadata (name, version, description).
Dependencies (external libraries your project needs).
Scripts (commands to run with npm run ...).

Example:
{
"name": "my-app",
"version": "1.0.0",
"dependencies": {
"express": "^4.21.1"
}
}

Here:
version: "1.0.0" → Your app’s version.
"express": "^4.21.1" → Dependency with semantic versioning rules.

🔹 What is Semantic Versioning (SemVer)?
Semantic Versioning (SemVer) follows the format:
MAJOR.MINOR.PATCH

📍 Parts of Version:

MAJOR (X.0.0) → Breaking changes.
Incompatible API changes.
May break existing code.
Example: 4.x.x → 5.0.0.

MINOR (0.X.0) → New features, backward-compatible.
Old code continues to work.
Example: 4.21.0 → 4.22.0.

PATCH (0.0.X) → Bug fixes, backward-compatible.
No new features, just fixes.
Example: 4.21.1 → 4.21.2.

🔹 Versioning Examples
Version Change Meaning
1.0.0 → 1.0.1 Patch update (bug fix, safe)
1.0.0 → 1.1.0 Minor update (new feature, safe)
1.0.0 → 2.0.0 Major update (breaking change)
🔹 Symbols in Dependencies

When you see "express": "^4.21.1" or "~4.21.1", these symbols control updates:
Exact Version
"express": "4.21.1"
→ Always installs only this version.

Tilde (~)
"express": "~4.21.1"
→ Allows patch updates only.
Accepts: 4.21.2, 4.21.3, ...
Does not accept 4.22.0.

Caret (^)

"express": "^4.21.1"
→ Allows minor + patch updates, but not major updates.
Accepts: 4.22.0, 4.23.5, ...
Does not accept 5.0.0.

🔹 Safe Update Rules
Patch (x.x.1) → Always safe to update (bug fixes).
Minor (x.1.x) → Usually safe (new features, backward compatible).
Major (1.x.x) → Be careful! May break your app.

🔹 Example with Express
"express": "^4.21.1" means:
Current major = 4 (locked).
Minor and patch (21.x and x) can update automatically.
Will not auto-upgrade to 5.x.x, because it may break code.

🔹 When Major Versions Change
Example: Moving from Express 4 → Express 5
Some APIs are removed/changed (app.delete, req.body, etc.).
Developers must follow migration guide.
Code updates are required → Breaking change.

🔹 Summary Diagram
MAJOR . MINOR . PATCH
↑ ↑ ↑
│ │ └─ Bug fixes (safe updates)
│ └───────── New features (backward-compatible)
└───────────────── Breaking changes (requires code update)

✅ Key Takeaway:
Use caret (^) for most dependencies → keeps your project updated with new features & fixes, but avoids breaking changes from major updates.

//////////////////////////////////////////////////////////////////////////////////////////////////////

📘 REST API Notes

🔹 What is a REST API?
REST API (Representational State Transfer API) is an architectural style for designing backend APIs.
It is not specific to Node.js or Express – it can be implemented in any language (Java, Rust, Node.js, etc.).
The goal is to design scalable, predictable, and stateless APIs.

Key Principles of REST APIs

1. Statelessness
   The server should not store client-related state in memory.
   If needed, use a database (Postgres, MongoDB, Redis, etc.) for persistence.
   Why? Because real-world servers scale up and down automatically, and in-memory state may be lost.
   Ensures APIs are scalable and reliable.

2. Client-Server Architecture
   Client and Server must be separate applications:
   Client → Mobile app (Android/iOS), Web app, Desktop app.
   Server → Backend service providing APIs.
   Server should not send UI code (HTML, CSS), only data (JSON/XML).
   Client is responsible for rendering the UI.
   Communication happens through API calls.

3. Uniform Interface
   APIs should behave in a predictable and consistent way.
   Use HTTP methods correctly:
   GET /tweets → Get all tweets.
   POST /tweets → Create a new tweet.
   PUT /tweets/:id → Update an existing tweet.
   DELETE /tweets/:id → Delete a tweet.

Example of a bad design:
GET /tweets creating a new tweet → ❌ not predictable.

4. Cacheable Responses
   Server responses should be cacheable where possible.
   Clients can cache data to improve performance and reduce server load.

Why REST APIs?
Industry standard → ~99% of companies use RESTful APIs.
They are scalable, predictable, and easy to test.
Testable via tools like:
Thunder Client (VS Code extension)
Postman
cURL

Summary
✅ REST API is an architecture style, not a framework.
✅ Core principles:
Statelessness
Client-Server separation
Uniform interface
Cacheable responses
