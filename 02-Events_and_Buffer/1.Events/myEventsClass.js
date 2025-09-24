// Understanding Events using class

const EventEmitter = require("events");
// Importing the built-in 'events' module from Node.js.
// This module allows us to create, emit, and listen to custom events.

// Define a class 'Chat' that extends EventEmitter
class Chat extends EventEmitter {
    // A custom method to send a message
    sendMessage(msg) {
        console.log(`Message sent: ${msg}`);
        // Log the message being sent

        this.emit("MessageReceived", msg);
        // Emit (trigger) a custom event called "MessageReceived"
        // and pass the message as event data
    }
}

// Create an instance of the Chat class
const chat = new Chat();

// Register a listener for the "MessageReceived" event
chat.on("MessageReceived", (data) => {
    console.log(`New message: ${data}`);
    // This function will run whenever the "MessageReceived" event is emitted
});

// Trigger the event by calling sendMessage
chat.sendMessage("Hey!");
// Output:
// Message sent: Hey!
// New message: Hey!

