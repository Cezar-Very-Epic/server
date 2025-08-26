const express = require("express");
const app = express();
app.use(express.json());

let Messages = [];                  // [{ Data, ExpiresAt }]
const MessageLifetime = 5000;       // 5 seconds

function pruneExpired() {
  const now = Date.now();
  Messages = Messages.filter(m => m.ExpiresAt > now);
}

// Discord bot sends a message
app.post("/send", (req, res) => {
  const message = {
    Data: req.body,                 // e.g. { User: "...", Message: "..." }
    ExpiresAt: Date.now() + MessageLifetime
  };
  Messages.push(message);
  console.log("Received:", message.Data);

  // Auto-delete after 5 seconds (no-op if already fetched)
  setTimeout(() => {
    const idx = Messages.indexOf(message);
    if (idx > -1) Messages.splice(idx, 1);
  }, MessageLifetime);

  res.send("Message added!");
});

// Roblox fetches messages
app.get("/fetch", (req, res) => {
  pruneExpired();
  const batch = Messages.map(m => m.Data); // send only the payload
  Messages.length = 0;                     // delete everything we just returned
  res.set("Cache-Control", "no-store");    // avoid intermediary caching
  res.json(batch);                         // [] when no messages
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
