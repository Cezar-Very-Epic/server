const express = require("express");
const app = express();
app.use(express.json());

let lastData = {}; // Stores the latest message

// Endpoint Discord bot POSTs data to
app.post("/send", (req, res) => {
    lastData = req.body; // Example: { User: "username", Message: "text" }
    console.log("Received:", lastData);
    res.send("Data received!");
});

// Endpoint Roblox GETs data from
app.get("/fetch", (req, res) => {
    res.json(lastData);
});

// Use Railway provided port or default 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
