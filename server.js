const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3002;

// Store temperature in memory
let temp = 0;

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

// Route to get temperature
app.get("/gettemp", (req, res) => {
    res.json({ temp: `${temp} Celsius` });
});

// Root route (optional)
app.get("/", (req, res) => {
    res.send("Welcome to Temperature API 🌡️");
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
