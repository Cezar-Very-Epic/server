const express = require("express");
const app = express();
app.use(express.json());

let messages = []; // Store all messages temporarily

// Discord bot sends a message
app.post("/send", (req, res) => {
    messages.push(req.body); // Add message to the array
    console.log("Received:", req.body);
    res.send("Message added!");
});

// Roblox fetches messages
app.get("/fetch", (req, res) => {
    res.json(messages);
    messages = []; // Clear after sending to Roblox
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
