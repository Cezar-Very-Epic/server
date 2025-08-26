const express = require("express");
const app = express();
app.use(express.json());

let messages = []; // Store all messages temporarily
const MESSAGE_LIFETIME = 5000; // 5 seconds in milliseconds

// Discord bot sends a message
app.post("/send", (req, res) => {
    const message = {
        data: req.body,
        timestamp: Date.now() // mark the time the message was received
    };
    messages.push(message);
    console.log("Received:", req.body);

    // Automatically remove this message after 5 seconds
    setTimeout(() => {
        const index = messages.indexOf(message);
        if (index > -1) messages.splice(index, 1);
    }, MESSAGE_LIFETIME);

    res.send("Message added!");
});

// Roblox fetches messages
app.get("/fetch", (req, res) => {
    // Only send the message data, not timestamps
    res.json(messages.map(msg => msg.data));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
