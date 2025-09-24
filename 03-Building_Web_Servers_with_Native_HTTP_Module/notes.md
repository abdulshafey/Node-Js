🌐 HTTP Server Basics in Node.js

1. What is HTTP?
   HTTP → Hyper Text Transfer Protocol
   Protocol for transferring information over the internet.
   Foundation of web communication (used in APIs, websites, etc.).

2. Components of HTTP Communication

🖥️ Client
Any device/application making a request.
Examples: Browser, Mobile App, Postman, Laptop.

💻 Server
A machine connected to the internet 24/7.
Has a public static IP address (so clients can reach it).
Can be hosted on:
AWS, Azure, Google Cloud
Bare metal (physical server at home/office).

3. Request-Response Cycle
   Client sends a Request
   Request types:
   GET → fetch data
   POST → send data
   DELETE → remove data
   PUT/PATCH → update data
   Server processes the Request
   Authentication → Who are you?
   Authorization → Are you allowed to access this?
   Validation → Is the data correct?
   Processing → Perform business logic (e.g., read/write in DB).
   Database Interaction (optional)
   Server often connects to databases to fetch/store information.
   Examples:
   MySQL
   PostgreSQL
   MongoDB

Server sends a Response
Success → data / confirmation message
Failure → error message / status code

4. Request-Response Cycle Diagram
   [ Client (Browser/Mobile) ]
   |
   | HTTP Request
   v
   [ Server (Public IP + 24/7) ]
   |
   | Processes request
   | - Authentication
   | - Authorization
   | - Validation
   | - Database Operations
   v
   [ Database (MySQL/MongoDB/etc.) ]
   |
   | Data retrieved/updated
   v
   [ Server prepares Response ]
   |
   | HTTP Response
   v
   [ Client receives Response ]

5. Key Takeaway
   Client ↔ Server communication = Request + Response
   Server is just a machine with logic + DB connectivity.
   Node.js allows us to build HTTP servers to handle these cycles.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

📒 Notes on HTTP Server, Requests, and Responses

1. What is a Server?
   A server is just a machine (physical or cloud) that:
   Is connected to the internet 🌍
   Has a public static IP address
   Runs 24/7 uptime
   Processes client requests and returns responses
   Examples:
   Cloud: AWS, Azure, Google Cloud
   Bare metal: A physical server running at home/office

2. Client–Server Model
   Client → Mobile, laptop, browser, etc.
   Server → Handles requests, processes them, returns responses
   Often connected to a Database (MySQL, MongoDB, PostgreSQL, etc.)

🔄 Request–Response Cycle
Client sends a request (with HTTP method like GET, POST, etc.).
Server processes the request (validation, DB operations).
Server sends back a response with:
Data (if any)
HTTP status code
Client closes the connection (or keeps it alive in some cases).

3. Sequence Diagram (Request–Response Cycle)
   Client Server Database
   | | |
   | ---- Request ---->| |
   | |---- Query/Write --->|
   | |<--- Data/Result ----|
   |<--- Response -----| |
   | | |

👉 This cycle continues whenever the client makes a new request.

4. HTTP Methods
   Each request has a method that defines its purpose:
   GET → Retrieve data (e.g., view tweets, watch a video, read comments)
   POST → Send new data (e.g., create a tweet, upload a video, add comment)
   PATCH → Update existing data (e.g., edit profile info)
   DELETE → Remove data (e.g., delete a post or file)
   PUT → Replace existing data (full update)

5. HTTP Status Codes
   Status codes tell the client what happened:
   Categories
   1xx (Informational) → Request received, processing continues
   2xx (Success) → Request successful
   3xx (Redirects) → Further action needed (e.g., moved resource)
   4xx (Client Errors) → Problem with client’s request
   5xx (Server Errors) → Problem with the server

Common Examples
200 OK → Success
201 Created → Resource created successfully
301 Moved Permanently → Redirect
400 Bad Request → Invalid request
401 Unauthorized → Authentication required
403 Forbidden → No permission
404 Not Found → Resource doesn’t exist
500 Internal Server Error → Server failure

6. Combined View (Request + Methods + Status Codes)
   Client -------- Request (GET/POST/PUT/DELETE) -------> Server
   Client <------- Response (Data + Status Code) -------- Server

Examples:
GET /tweets → Response 200 (OK) with tweets list
POST /tweets → Response 201 (Created) with new tweet ID
GET /profile/123 → Response 404 (Not Found) if user doesn’t exist
DELETE /tweets/99 → Response 403 (Forbidden) if not authorized

📘 Notes: Understanding HTTP Requests
🌐 What is an HTTP Request?

A request is how a client (browser, app, etc.) communicates with a server.
Request contains:
Method → Type of action (GET, POST, PUT, PATCH, DELETE).
Headers → Extra information (metadata).
Body → Actual data being sent (optional).
URL → Address that identifies the resource.

🛠 Components of an HTTP Request
1️⃣ Method

Defines what action the client wants.
Examples:
GET → Fetch data.
POST → Send data (create resource).
PUT/PATCH → Update existing data.
DELETE → Remove data.

2️⃣ Headers

Like the "label" on a postal envelope.
Provide metadata about the request.
Example headers:
Content-Type: application/json
Authorization: Bearer <token>
User-Agent: Chrome / MacOS
Accept-Language: en-US

📦 Analogy:
Envelope cover = Headers (info like sender, recipient, type).
Letter inside = Body (actual content).

3️⃣ Body

Optional, used mainly in POST/PUT/PATCH requests.
Contains actual data sent to the server.
Example:
{
"tweet": "What an awesome day!"
}

4️⃣ URL (Uniform Resource Locator)

A typical URL looks like:
https://www.google.com/search?q=cat&sort=desc
Breakdown:
Scheme/Protocol → https (secure HTTP).
Subdomain → www.
Domain (Apex/Naked domain) → google.com.
Path → /search (resource location).
Query Parameters → After ?
q=cat → key: q, value: cat
sort=desc → key: sort, value: desc

📊 Diagram: HTTP Request Structure
+------------------------------------------------------+
| Method: GET |
| URL: https://www.google.com/search?q=cat&sort=desc |
| Headers: |
| Content-Type: application/json |
| Authorization: Bearer <token> |
| |
| Body: (optional) |
| { "tweet": "What an awesome day!" } |
+------------------------------------------------------+

📌 Key Points
Methods → Define the action.
Headers → Carry metadata.
Body → Holds actual content (optional).
URL → Defines resource + parameters.
