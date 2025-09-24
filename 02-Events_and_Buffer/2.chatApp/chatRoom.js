const EventEmitter = require("node:events")
// Import the EventEmitter class from Node.js core module "events".
// (The "node:" prefix is just a modern style, both "events" and "node:events" work.)

class ChatRoom extends EventEmitter {
    constructor() {
        super(); // Call parent constructor (EventEmitter)
        this.users = new Set();
        // Using a Set to store unique users currently in the chat
    }


    // Add user to the chat
    join(user) {
        this.users.add(user);              // Store the user
        this.emit("join", user);           // Emit a "join" event so listeners can react
    }

    // Send a message in the chat
    sendMessage(user, message) {
        if (this.users.has(user)) {
            this.emit("message", user, message);
            // Emit a "message" event with sender and text
        } else {
            console.log(`${user} is not in chat`);
            // If user not present, log a warning
        }
    }

    // Remove user from the chat
    leave(user) {
        if (this.users.has(user)) {
            this.users.delete(user);       // Remove user from Set
            this.emit("leave", user);      // Emit a "leave" event
        }
        else {
            console.log(`${user} is not in the chat`);
            // Warn if user wasn’t part of the chat
        }
    }
}

module.exports = ChatRoom
// Export the class so it can be imported in another file.
// Example: const ChatRoom = require("./ChatRoom");
