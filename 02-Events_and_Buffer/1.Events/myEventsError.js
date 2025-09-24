const EventEmitter = require("events");
// Import the built-in 'events' module from Node.js.
// This gives access to the EventEmitter class.

const eventEmitter = new EventEmitter();
// Create an instance of EventEmitter.
// We’ll use this object to emit and listen to events.

// Attach a listener for the "error" event
eventEmitter.on("error", (err) => {
    console.error(`Error Occurred: ${err.message}`);
    // Whenever the "error" event is emitted, this callback runs.
    // It receives an Error object and logs the error message.
});

// Emit (trigger) the "error" event with an Error object
eventEmitter.emit("error", new Error("Something went wrong"));
// → This fires the "error" event, passing an Error instance.
// → The listener prints: "Error Occurred: Something went wrong"
