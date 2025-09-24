const ChatRoom = require("./chatRoom.js")
// Import the ChatRoom class we defined earlier

const chat = new ChatRoom()
// Create a new instance of ChatRoom

// Listener for when a user joins
chat.on("join", (user) => {
    console.log(`${user} has joined the chat`);
});

// Listener for when a message is sent
chat.on("message", (user, message) => {
    console.log(`Messages from ${user} : ${message}`);
});

// Listener for when a user leaves
chat.on("leave", (user) => {
    console.log(`${user} has left the chat`);
});

// --- Simulating the chat ---
chat.join("Alice");
// → Adds Alice to the chat, emits "join"

chat.join("bob");
// → Adds bob, emits "join"

chat.join("John");
// → Adds John, emits "join"

chat.sendMessage("Alice", "Hello to everyone");
// → Alice sends message, emits "message"

chat.sendMessage("John", "Hello Alice and everyone");
// → John sends message, emits "message"

chat.leave("bob");
// → Removes bob, emits "leave"

chat.sendMessage("bob", "Am I still here?");
// → bob already left, so warning: "bob is not in the chat"
