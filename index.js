const express = require("express");
const app = express();
app.use(express.json());

let messages = [];
let counter = 0;

// Discord bot sends a message
app.post("/send", (req, res) => {
    counter++;
    const messageWithId = {
        id: Date.now() + "-" + counter, // unique ID
        ...req.body
    };
    messages.push(messageWithId);
    console.log("Received:", messageWithId);
    res.send("Message added!");
});

// Roblox fetches messages
app.get("/fetch", (req, res) => {
    res.json(messages);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
