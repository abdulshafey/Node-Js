const EventEmitter = require("node:events");
// Import the built-in 'events' module from Node.js.
// This module gives us the EventEmitter class, which lets us create, emit, and listen to events.

const eventEmitter = new EventEmitter();
// Create an instance/object of EventEmitter. 
// We’ll use this object to define, listen to, and emit events.

// Attach a listener for the "greet" event
eventEmitter.on("greet", () => {
    console.log("Hello");
    // When "greet" is emitted, this function runs and prints "Hello <name>"
});

// Attach another listener for the same "greet" event
eventEmitter.on("greet", (name) => {
    console.log(`Hello ${name} welcome to NodeJs`);
    // Multiple listeners can listen to the same event.
    // Both this and the previous one will run in the order they were registered.
});

// Attach a one-time listener for the "connection" event
eventEmitter.once("connection", (username) => {
    console.log(`Ah, we have our first user! \n Welcome ${username}`);
    // "once" means this listener will run ONLY the first time "connection" is emitted,
    // and then it will be removed automatically.
});

// Emit (trigger) the "greet" event with the argument "Abdul Shafey"
eventEmitter.emit("greet");
// → Both "greet" listeners will run

// Emit (trigger) the "connection" event with the argument "Abdul Shafey"
eventEmitter.emit("connection", "Abdul Shafey");
// → The "once" listener runs this time

// Emit "greet" again
eventEmitter.emit("greet", "Abdul Shafey");
// → Both greet listeners run again (they are still active)

// Emit "connection" again with a new name
eventEmitter.emit("connection", "John Wick");
// → This won’t trigger anything, because the "once" listener was removed after first call

// Define a test listener function
const listener = () => console.log("I am a test listener");

// Attach the "test" event with listener
eventEmitter.on("test", listener);
// Now "test" has one active listener

// Emit "test"
eventEmitter.emit("test");
// → "I am a test listener" is printed

// Remove the listener from "test"
eventEmitter.removeListener("test", listener);
// Now "test" has no listeners

// Emit "test" again
eventEmitter.emit("test");
// → Nothing happens, since no listeners are attached now

// Check what listeners are currently registered for the "greet" event
console.log(eventEmitter.listeners("greet"));
// Prints an array of functions (the two greet listeners we attached earlier)

