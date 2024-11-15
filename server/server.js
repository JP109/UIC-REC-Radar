// server.js
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Import Routes
const userRoutes = require("./routes/userRoutes");
const challengeRoutes = require("./routes/challengeRoutes");

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/challenges", challengeRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
