📘 Notes on Express Middlewares
🔹 What is Middleware?

A middleware in Express is a function that runs between the incoming request and the route handler.
It has access to:
req → request object
res → response object
next → function to pass control to the next middleware/route
👉 Think of it as a man-in-the-middle for every request.

🔹 How Middleware Works
A user sends a request → goes to Express app.
app checks which route matches.
Before hitting the route, middlewares can intercept the request.

Middlewares can:
Read/modify request and response
Stop (terminate) the request-response cycle
Pass request to the next middleware using next()

🔹 Key Features of Middleware
✔ Can execute any code (e.g., logging, DB calls, validation).
✔ Can modify req and res objects.
✔ Can end the request-response cycle (send response early).
✔ Can pass control to next middleware or final route with next().
✔ Multiple middlewares run in sequence (stacked in the order you define).

🔹 Types of Middleware
Built-in → e.g., express.json() (parses JSON request body).
Custom → Your own functions (logging, validation, auth checks).
Third-party → e.g., morgan, cors, helmet.

🔹 Example of a Middleware
app.use((req, res, next) => {
console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
next(); // Pass control to next middleware/route
});

🔹 Common Use Cases
Logging requests (who, when, what)
Authentication (check if user is logged in)
Authorization (check if user has permissions)
Input validation (ensure body has correct fields)
Error handling
Attaching extra data to req

🔹 Example Workflow
Request comes → Middleware A (Logger) logs the request.
Passes to Middleware B (Auth Check).
If user not logged in → stop request, return 403 Forbidden.
If logged in → next().
Passes to Middleware C (Authorization).
If user not allowed → 403 Unauthorized.
Else → next().
Passes to Route Handler → runs final logic (e.g., return books).

🔹 Practical Example
// Middleware: Authentication
function isAuthenticated(req, res, next) {
if (!req.headers['auth-token']) {
return res.status(401).json({ error: "Not logged in" });
}
next();
}

// Middleware: Authorization
function isAdmin(req, res, next) {
if (req.headers['role'] !== 'admin') {
return res.status(403).json({ error: "Not authorized" });
}
next();
}

// Apply middleware before routes
app.get('/admin', isAuthenticated, isAdmin, (req, res) => {
res.send("Welcome Admin!");
});

🔹 Summary
Middleware = functions that sit between request and response.
Runs in order → can log, validate, modify, or stop request.
Essential for authentication, authorization, validation, and logging.
Without calling next(), request gets stuck.

🔹 Types of Middlewares

Global Middleware
Applied using app.use() at the top of your app.
Runs on every request, no matter what route.

// Global middleware (runs for all routes)
app.use((req, res, next) => {
console.log("Global Middleware");
next();
});

Route-Level Middleware
Attached to a specific route.
Runs only when that route is requested.

// Middleware function
const customMiddleware = (req, res, next) => {
console.log("Custom middleware for this route");
next();
};

// Apply middleware only on GET /books
app.get("/books", customMiddleware, (req, res) => {
res.send("Books list");
});

🔑 Flow: Request → middleware(s) → route handler.

You can have multiple middlewares in series.
Each calls next() to move forward.
Final one usually ends the cycle with res.send() or res.json().
Path-Based Middleware
Middleware runs for all HTTP methods (GET, POST, DELETE, etc.)
but only when path matches.

app.use("/books", (req, res, next) => {
console.log("Middleware for all /books routes");
next();
});

👉 Works for /books, /books/:id, etc.
Router-Level Middleware
Applied to an Express router instance (instead of whole app).
Useful for modular apps.
const express = require("express");
const bookRouter = express.Router();

// Router-level middleware
bookRouter.use((req, res, next) => {
console.log("Middleware inside book router");
next();
});

bookRouter.get("/", (req, res) => res.send("All books"));
bookRouter.post("/", (req, res) => res.send("Book created"));
app.use("/books", bookRouter);

🔹 Middleware Chains (Multiple Middlewares)
You can stack middlewares for one route.
They run in order.
const logger = (req, res, next) => {
console.log("Logger");
next();
};

const auth = (req, res, next) => {
console.log("Auth check");
next();
};

app.get("/secure", logger, auth, (req, res) => {
res.send("Secure route accessed");
});

👉 Flow: logger → auth → route handler.

🔹 Important Points
A route handler itself is also a middleware (final one).
If a middleware does not call next() or res.send(), the request will hang.
Starting with Express v5:
Middleware functions that return a promise and reject/throw error → will be automatically passed to error handling middleware.

🔹 Summary
Global middleware → runs everywhere.
Route-level middleware → runs only for specific route(s).
Path-based middleware → runs for all HTTP methods on a path.
Router-level middleware → applied inside express.Router().
Middlewares can be chained for advanced flows (auth → logging → validation → handler).

/////////////////////////////////////////////////////////////////////////////////////////////

📘 Notes on Modules in Node.js

1. Types of Modules

Built-in modules
Provided by Node.js (e.g., fs, http, path).
Imported using require("moduleName").

Third-party modules
Installed via npm (e.g., express).
Imported using require("express").

User-defined (custom) modules
Created by developers for project-specific needs.
Require export (to share code) and import (to use code).

2. Why Custom Modules?

Keeps code clean and maintainable.
Related functions/features grouped together in separate files.
Example: Math operations in math.js, main app in index.js.

3. Exporting in Node.js

There are two ways:
(a) Named Exports
Each export has a name.
You can export multiple functions/variables.

math.js
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
exports.multiply = (a, b) => a \* b;
exports.divide = (a, b) => a / b;

index.js
const math = require("./math");

// Using object-style
console.log(math.add(2, 5));  
console.log(math.subtract(10, 4));

// OR destructure directly
const { add, divide } = require("./math");
console.log(add(3, 7));
console.log(divide(10, 2));

👉 Named exports return an object containing all exports.

(b) Default Exports
Only one default export per file.
No specific name, can be imported with any name.

math.js
module.exports = function () {
console.log("Hello, I am the default export");
};

index.js
const greet = require("./math"); // name can be anything
greet(); // "Hello, I am the default export"

👉 Use when a module has one main thing to export.

4. Import Paths
   ./ → current directory
   ../ → one folder up
   Example: require("./lib/math")

5. Wrapper Function in Node.js
   Every module in Node.js is wrapped internally like this:

(function(exports, require, module, **filename, **dirname) {
// Your module code
})();

That’s why exports and module.exports are available inside every file.

6. Best Practices
   Group related features in modules.
   Use named exports when exporting multiple utilities.
   Use default export when exporting one main function/class.
   Keep folder structure clean (e.g., lib/, routes/, controllers/).

/////////////////////////////////////////////////////////////////////////////////////////////

📘 Notes on MVC (Model–View–Controller) Architecture

1. Why MVC?
   As applications grow, code becomes hard to manage.
   MVC provides a structured way to separate responsibilities.
   It improves cleanliness, maintainability, scalability, and teamwork.

2. Components of MVC
   🔹 Model
   Represents the data layer (database, entities, schemas).
   Responsible for:
   Storing data
   Fetching data
   Updating/deleting records
   Example: Book model in database (table or schema).

🔹 View
Represents the UI layer (what the user sees).
Can be:
React frontend
HTML/CSS/JS templates
EJS / Handlebars / any templating engine
Role: Display data to users and send user actions to controllers.

🔹 Controller
Represents the business logic layer.
Acts as a bridge between View and Model.

Responsibilities:
Accept requests from Views (frontend)
Validate input & check authentication/authorization
Interact with Models (DB operations)
Send processed response back to Views

3. MVC Flow
   User (View) → sends a request (e.g., "Get all books").
   Controller → receives request, processes logic, talks to Model.
   Model → interacts with the database (fetch, insert, delete).
   Controller → sends result back.
   View → displays data to the user.

4. Example Structure
   project/
   │── index.js # Entry point, starts server
   │
   ├── routes/ # Routes map URLs to controllers
   │ └── book.routes.js
   │
   ├── controllers/ # Controllers hold app logic
   │ └── book.controller.js
   │
   ├── models/ # Database models/entities
   │ └── book.model.js
   │
   ├── middlewares/ # Middlewares like logger, auth
   │ └── logger.js
   │
   └── views/ # Frontend templates (optional in APIs)
   └── index.ejs

5. Benefits of MVC
   Separation of Concerns → Each layer has a single responsibility.
   Maintainability → Easy to modify/extend.
   Scalability → Supports large projects with multiple developers.
   Reusability → Models, controllers, and views can be reused.

✅ In short:
Model → Data
View → UI
Controller → Logic (glue between View & Model)
