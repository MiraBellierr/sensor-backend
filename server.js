const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3002;

// Store temperature in memory
let temp = 0;
let current = "Laser is currently IDLE";

// Middleware
app.use(cors());              // Enable CORS
app.use(express.json());      // Parse JSON request body

// Route to update temperature
app.post("/temp", (req, res) => {
    const { temp: newTemp } = req.body;

    if (typeof newTemp !== "number") {
        return res.status(400).json({ error: "Temperature must be a number" });
    }

    temp = newTemp;
    res.json({ message: "Temperature updated successfully", temp });
});

app.post("/current", (req, res) => {
    const { current: newCurrent } = req.body;

    current = newCurrent;
    res.json({ message: "Current updated successfully", current});
})

// Route to get temperature
app.get("/gettemp", (req, res) => {
    res.json({ temp: `${temp} Celsius` });
});

app.get("/getCurrent", (req, res) => {
    res.json({ current });
});

// Root route (optional)
app.get("/", (req, res) => {
    res.send("Welcome to Temperature API 🌡️");
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
