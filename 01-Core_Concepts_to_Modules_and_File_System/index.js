/*
Q -> What is NodeJS
Before understanding Node.js, let’s first understand JavaScript (JS).

JavaScript is one of the three core languages that browsers understand:
HTML → provides structure and layout
CSS → provides styling
JavaScript → provides interactivity and functionality

Browsers cannot understand any other programming language directly. Every browser comes with a JavaScript engine that executes JavaScript code.
Chrome → V8 Engine
Firefox → SpiderMonkey
Safari → JavaScriptCore (WebKit)

For example, if you open the browser console and type:

2 + 2
// Output: 4

console.log("Hello")
// Output: Hello

This works because the browser’s JavaScript engine is interpreting and running your JS code.

❌ Limitation of JavaScript
JavaScript engines are embedded inside browsers, which means originally JavaScript could only run inside a browser, not directly on your computer or server.

✅ Enter Node.js
The breakthrough happened when Ryan Dahl (often mistakenly called Rian/Rihan) took the open-source V8 engine from Chrome and embedded it inside a C program.
Why C?
Because C programs can directly interact with your machine’s operating system and hardware.

So now:
The V8 engine executes JavaScript.
The C program allows it to run outside the browser.
This combination became Node.js, and just like V8, Node.js itself is also open source — meaning its code is publicly available and developers 
worldwide contribute to its improvement.

💡 So, What is Node.js?
Node.js is not a framework.
Node.js is not a library.
Node.js is a runtime environment that allows you to execute JavaScript code outside of the browser.

In simple words:
👉 Node.js = Chrome’s V8 engine embedded inside a C program, giving us the ability to run JavaScript anywhere.
⚡ That’s why you can now build servers, APIs, command-line tools, and even desktop apps using JavaScript with Node.js.
*/

/*
Difference Between JavaScript in Browser and Node.js

When you write JavaScript code in the browser, you can use features like alert, document, window, fetch, setTimeout, etc. But not all of these are 
part of JavaScript itself—many of them are Web APIs provided by the browser. For example, alert is not part of core JavaScript, it is a browser-provided functionality that displays a UI message.
However, if you try running the same alert in Node.js, you’ll get an error because Node.js runs in a command-line environment without a window, UI, or browser APIs.
Node.js only supports core JavaScript and provides its own additional modules like File System (fs), Crypto, etc. It reimplements only the APIs that make sense outside of a browser, 
such as setTimeout and setInterval, but not browser-specific ones like alert or document.getElementById.

👉 In summary:
Browser JavaScript = Core JS + Browser APIs (DOM, alert, fetch, window, document).
Node.js JavaScript = Core JS + Node.js APIs (fs, crypto, CLI utilities).
Both environments run JavaScript, but the APIs available depend on the runtime environment.

👉 In Short:
JavaScript in the browser has access to Web APIs like alert, document, and fetch provided by the browser, while Node.js runs JavaScript in a 
command-line environment with its own APIs like fs and crypto. Both run JavaScript, but the available APIs depend on the runtime.
*/

/* 
Q -> Understanding Node.js Modules and Their Role in Structuring Code

🔹 What are Modules in Node.js?

Modules are used to organize and reuse code.
They allow us to split code into smaller, manageable files.

Types of modules:
Built-in modules → provided by Node.js (e.g., fs, http).
Third-party modules → installed via npm (e.g., express).
Custom modules → created by you (e.g., math.js).

🔹 How to Use Modules?
Use require() to load modules.
const fs = require("fs"); // Built-in module
const math = require("./math.js"); // Custom module
require("fs") → loads Node.js built-in file system module.
require("./math.js") → loads your own custom file.

🔹 How Node.js Handles require
First checks third-party modules (from node_modules).
Then checks built-in modules.
Finally checks custom modules (paths like ./ or ../).

🔹 Behind the Scenes (Module Wrapper)
Node.js wraps every module inside a function:
(function(exports, require, module, __filename, __dirname) {
   // your code here
});


This gives access to:
require → load modules
exports / module.exports → share code
__filename → current file path
__dirname → current directory path

🔹 Module Caching
Once a module is loaded, Node.js caches it.
Next time you require() it, Node.js uses the cached version → improves performance.

✅ Key Takeaway:
In browsers → JS runs with Web APIs (alert, document, window).
In Node.js → JS runs with Node APIs (fs, crypto, http).
Modules make Node.js powerful and flexible for building apps.

*/

/*
npm(Node Package Manager) is used to manage packages in Node.js projects.Although “Node Package Manager” is not an official full form,
it makes sense since npm is responsible for handling external libraries and dependencies.To start using npm in a project, you need a package.json file at the root of your project.
This file acts as a configuration / manifest and contains details like project name, version, entry point, scripts, and most importantly, dependencies.You can create it by running npm init,
which asks for basic information and generates the file.Dependencies are added when you install external packages using npm install <package-name>, and the installed source code is stored
inside the node_modules folder. You should never push node_modules to GitHub because it is bulky—your collaborators can regenerate it by running npm install, which fetches all dependencies listed in package.json.
Alongside, npm also creates a package-lock.json file, which records the exact versions of dependencies and even the dependencies of dependencies. This ensures consistency across different environments. In short,
package.json defines your project’s dependencies, node_modules contains the actual code, and package-lock.json ensures version integrity.
*/

/* 
📘 Notes: Node.js File System (FS) Module
 
🔹 Importing the FS Module
  •	In older Node.js versions:
  const fs = require("fs");
 
  •	In newer Node.js versions (preferred):
  const fs = require("node:fs");

  •	✅ Why node:fs?
  •	Explicitly tells Node.js that this is a built-in module.
  •	Prevents conflicts if a third-party package has the same name.
    •	Convention:
    •	node:moduleName → built-in module
    • "package-name" → external module
    • "./moduleName" → custom module or internal module 

    const fs = require("node:fs");

  🔹 Reading Files
  // Blocking (synchronous) read
  const contents = fs.readFileSync("notes.txt", "utf8");
  console.log(contents);

  •	readFileSync → blocking (synchronous).
  •	readFile → non-blocking (asynchronous).
  
  🔹 Writing Files
  fs.writeFileSync("copy.txt", "Hello World!", "utf8");
  •	Creates a new file (or overwrites if it already exists).
  •	Overwrites content by default.

  🔹 Appending to Files
  fs.appendFileSync("copy.txt", "\nNew content added", "utf8");
  •	Adds new content without overwriting.
  •	\n is used for new lines.

  🔹 Copy File Contents
   const data = fs.readFileSync("notes.txt", "utf8");
   fs.writeFileSync("copy.txt", data, "utf8");
   •	Reads from notes.txt and writes to copy.txt.

  🔹 Creating Directories
  fs.mkdirSync("games"); // creates "games" folder

  fs.mkdirSync("games/xyz/a", { recursive: true });
  // creates nested folders automatically

  🔹 Removing Directories
  fs.rmdirSync("games/a");
  fs.rmdirSync("games/xyz");
  fs.rmdirSync("games");

  🔹 Deleting Files
  fs.unlinkSync("copy.txt");
  •	Deletes the given file permanently.

  🔹 Summary of FS Functions

  Function                     Description
  readFileSync()               Reads file (blocking)
  writeFileSync()              Creates/writes file (overwrites)
  appendFileSync()             Appends data to file
  mkdirSync()                  Creates a directory
  rmdirSync()                  Removes a directory (must be empty)
  unlinkSync()                 Deletes a file


  🔹 Key Takeaways
  •	Use require("node:fs") → recommended for built-in modules.
  •	Sync methods (xxxSync) block the execution until complete.
  •	Async methods are non-blocking and should be preferred in production.
  •	FS module allows full file and directory management in Node.js (CRUD operations).
*/



// Import Node.js built-in 'fs' (file system) module
const fs = require("node:fs");
// console.log(fs); // Uncomment to see all methods available in fs

// -------------------- READ FILE --------------------

// 1. Synchronous read → blocks execution until file is completely read
const content = fs.readFileSync("notes.md", "utf-8");
// Reads file "notes.txt" and returns its contents as a string
// 'utf-8' ensures content is decoded to readable text
// console.log(content);

// 2. Asynchronous read → non-blocking (preferred for production)
fs.readFile("notes.md", "utf-8", (err, data) => {
  if (err) {
    console.log(err.message); // If file not found or error occurs
  }
  console.log(data); // Prints file content when read is finished
});

// -------------------- WRITE / APPEND FILE --------------------

// fs.writeFileSync("copy.txt", content, "utf-8")
// Writes content into "copy.txt". If file exists → overwrites it.
// ⚠️ Synchronous → blocks execution

fs.appendFileSync("notes.md", `\n Hello`, "utf-8")
// Appends "\n Hello" at the end of "notes.txt"
// Each run adds a new line with "Hello"

// -------------------- CREATE / DELETE FOLDERS --------------------

// fs.mkdirSync("game/xyz/a", { recursive: true })
// Creates directory "game/xyz/a". 
// 'recursive: true' ensures parent directories are created if not existing.

// fs.rmdirSync("game/xyz/a")
// Removes directory "game/xyz/a" (⚠️ must be empty)

// -------------------- DELETE FILE --------------------

fs.unlinkSync("test.txt")
// Deletes file "copy.txt" permanently
