📒 Notes: Node.js Events

1. Introduction

Events are a core concept in Node.js (and other runtimes like Bun, Deno, Arduino JS).
Node.js follows an event-driven architecture → asynchronous execution.
Much of the Node.js core API (e.g., fs, http, stream) is based on events.

2. Real-world Analogy

Example: Ordering a product on Amazon.
❌ Polling approach: User keeps checking the door for delivery → inefficient.
✅ Event-driven approach: Delivery guy rings the bell → user responds.
Similarly, the CPU (user) responds only when events (delivery) occur.

3. Node.js Architecture (simplified)

Events go through Libuv (event loop engine inside Node.js).
Libuv decides when to notify the CPU about an event.
CPU only gets busy when events require processing.

4. Key Concepts

EventEmitter Class (events module):
Emits (publishes) named events.
Listeners (subscribers) respond to events.
Basis of pub-sub model (publisher–subscriber).
Emitters: Objects that emit events.
Listeners: Functions attached to specific events.

5. Documentation Definition

Node.js core API is built around asynchronous, event-driven architecture.
When an event occurs, functions (listeners) respond to it.

6. Event Handling Model

Events are emitted → listeners respond.
Listeners can be:
Multi-callable (invoked multiple times).
Single-callable (invoked once).

7. Why Events?

Non-blocking: CPU isn’t stuck waiting.
Enables asynchronous programming without callbacks.
Widely used in real-time apps (chat, notifications, live updates).

Foundation of:
fs (File System)
http (Servers)
stream
WebSockets / Socket.IO
Makes Node.js suitable for scalable, real-time systems.

8. Publisher–Subscriber (Pub/Sub) Model

Publisher: Emits events.
Subscriber (listener): Responds when event is emitted.
Example:
Event = delivery guy rings the bell.
Listener = user opens the door.

9. Summary

Events are core to Node.js.
They provide efficiency, scalability, and responsiveness.
Mastering events is essential before diving into higher-level modules (http, fs, stream, socket.io).

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

📌 What is Libuv?

Libuv is a C library that provides asynchronous I/O capabilities.
Originally built for Node.js, but now used by other projects too (like Julia, Luvit, etc.).
It gives Node.js its event-driven, non-blocking I/O model.

👉 In simple words:
Libuv is the engine under the hood of Node.js that makes it possible to handle multiple operations (file reads, network requests, timers, etc.) without blocking the main thread.

📌 Role of Libuv in Node.js
Node.js is built on V8 (JavaScript engine) + Libuv (event loop & async I/O).

1. Event Loop Implementation

Libuv provides the event loop — the heartbeat of Node.js.
It manages queues of pending callbacks and decides what runs next.
Ensures JavaScript code (single-threaded) can still manage concurrent operations.

2. Asynchronous I/O

JavaScript itself can’t talk to the OS for async operations.
Libuv provides async, non-blocking bindings for:
File system operations
TCP/UDP sockets
DNS lookups
Timers (setTimeout, setInterval)
Instead of blocking, tasks are offloaded, and Libuv notifies Node.js when they are done.

3. Thread Pool

Not all OS operations are truly async (e.g., file system calls on most OSes).
Libuv uses a thread pool (default size = 4 threads) to handle "fake async" tasks.
E.g., fs.readFile() → runs inside a thread pool → callback runs later.
Developers feel it’s async, even if under the hood threads are doing the work.

4. Cross-Platform Abstraction

Different OSes (Linux, Windows, macOS) have different system APIs.
Libuv acts as a compatibility layer → same Node.js code works everywhere.
On Unix → uses epoll, kqueue, or event ports for I/O.
On Windows → uses IOCP (I/O Completion Ports).

5. Handles Timers and Delayed Tasks

Libuv manages scheduling of tasks like:
setTimeout
setInterval
setImmediate
process.nextTick (though this one is special, handled in V8 + Node)

📌 How Libuv Works in Flow

Example: fs.readFile("file.txt", callback)
JavaScript Layer: You call fs.readFile.
Node.js Binding: fs module forwards request to C++ bindings.
Libuv Thread Pool: File I/O happens inside Libuv’s worker thread.
Event Loop: When read finishes, Libuv pushes the result back to the event loop.
Callback Execution: Your callback in JS is finally executed with the file data.

📌 Diagram (Conceptual)
┌────────────┐
│ V8 JS │ (executes your JS code)
└─────┬──────┘
│
┌────────▼─────────┐
│ Node.js C++ │ (Bindings layer)
└────────┬─────────┘
│
┌────────▼─────────┐
│ Libuv │
│ (Event Loop + │
│ Thread Pool + │
│ Cross-Platform │
│ Abstraction) │
└────────┬─────────┘
│
┌───────▼────────┐
│ OS (Kernel) │ (epoll, kqueue, IOCP, etc.)
└────────────────┘

📌 Summary of Libuv’s Role in Node.js
Implements the event loop.
Provides async I/O operations.
Manages a thread pool for heavy tasks.
Makes Node.js cross-platform (Windows/Linux/macOS).
Ensures non-blocking architecture.
👉 Without Libuv, Node.js would just be a single-threaded JS runtime, unable to handle multiple tasks efficiently.
👉 With Libuv, Node.js can handle thousands of concurrent connections on a single thread.

⚙️ Libuv Event Loop Phases in Node.js
The event loop is a cycle that repeatedly checks if there is work to be done (timers, callbacks, I/O, etc.).
It has multiple phases executed in a predictable order.

📌 Event Loop Lifecycle
Each iteration of the event loop is called a tick.
Inside each tick, Libuv runs through these phases:

1. Timers Phase

Executes callbacks scheduled by:
setTimeout()
setInterval()
Only executes timers whose delay has expired.

Example:
setTimeout(() => console.log("Timer expired"), 1000);

2. Pending Callbacks Phase
   Executes I/O-related callbacks that were deferred to the next loop iteration.
   Example: Errors from TCP, UDP, or DNS operations.

3. Idle, Prepare (Internal Phase)

Used internally by Libuv.
Not directly accessible from user code.
Prepares for the poll phase.

4. Poll Phase (The Heart ❤️)

Waits for I/O events (like reading from a socket, file descriptor).
Executes I/O callbacks (e.g., fs.readFile, network responses).
If no timers are ready:
It can block here and wait for I/O.
If timers are ready:
It will end poll phase and go back to timers.

5. Check Phase

Executes callbacks scheduled by:
setImmediate()
Runs right after poll.
Example:
setImmediate(() => console.log("setImmediate callback"));

6. Close Callbacks Phase
   Executes close event callbacks.

Example:
const net = require("net");
const server = net.createServer();
server.on("connection", socket => {
socket.on("close", () => console.log("Socket closed"));
});

📌 Special Case: process.nextTick()
Not part of Libuv phases.
It is handled inside V8 + Node.js, not Libuv.

Always executed immediately after the current operation, before moving to the next event loop phase.
Example:

console.log("start");
process.nextTick(() => console.log("nextTick"));
console.log("end");
// Output:
// start
// end
// nextTick

📌 Visual Flow of the Event Loop
┌─────────────────────────────┐
│ 1. Timers (setTimeout, …) │
├─────────────────────────────┤
│ 2. Pending Callbacks │
├─────────────────────────────┤
│ 3. Idle, Prepare │ (internal)
├─────────────────────────────┤
│ 4. Poll (I/O waiting) │
├─────────────────────────────┤
│ 5. Check (setImmediate) │
├─────────────────────────────┤
│ 6. Close Callbacks │
└─────────────────────────────┘
↑
└── Back to start (next tick)

📌 Example to Show Difference (setTimeout vs setImmediate vs process.nextTick)
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
process.nextTick(() => console.log("nextTick"));
console.log("sync code");

👉 Possible Output:
sync code
nextTick
timeout
immediate

sync code runs first (normal JS execution).
process.nextTick runs before event loop continues.
setTimeout(..., 0) runs in timers phase.
setImmediate runs in check phase (after poll).

📌 Summary
Libuv event loop allows Node.js to handle async tasks in a single-threaded environment.
Main phases:
Timers
Pending Callbacks
Idle, Prepare
Poll (core of I/O)
Check (setImmediate)
Close Callbacks
process.nextTick and microtasks (Promises) run outside these phases with higher priority.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

📒 Notes on Buffers in Node.js

🔹 What is a Buffer?
A buffer is a temporary storage area for binary data.
In Node.js, buffers allow direct interaction with raw memory (outside the V8 heap).
Used when dealing with files, streams, and network data.

🔹 Why Do We Need Buffers?
Data in computers is stored as binary (0s and 1s).
Every number, character, emoji, or symbol → represented in binary.
Example: "H" = Unicode encoding 0x48 (hexadecimal).
Encodings help map numbers to characters:
UTF-8, UTF-16, UTF-32 → define how characters are represented.
Same number can mean different symbols under different encodings.
JavaScript strings are stored in UTF-16.
Not efficient for binary manipulation.
Buffers solve this problem by handling raw binary data efficiently.

🔹 Key Features of Buffers
Buffers store raw binary data (like hex values 0x48).
Operate outside the V8 heap, giving direct memory access
Can be dangerous if misused → may cause memory leaks or crashes.
Commonly used in:
File system operations (fs module).
Network protocols (TCP, UDP, WebSockets).
Streams (data is chunked and stored in buffers).

🔹 Real-Life Analogy
Think of buffer as a temporary container where data is placed before being processed.
Example:
When downloading a file or streaming video → data is first buffered before it can be displayed.
In Node.js, it’s used for file I/O and network communication.

🔹 Practical Points
Buffers are essential for:
Handling files (read/write).
Processing binary protocols.
Working with streams (chunked data).
Limitations:
If allocated buffer size > available memory → app crash.
Requires careful memory management.

🔹 Summary
Buffers = raw binary storage in Node.js.
Needed because JS (UTF-16 strings) isn’t efficient for binary.
Work outside V8 heap → faster for I/O.
Used in fs, streams, networking, and real-time apps.
