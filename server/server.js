// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "https://uic-rec-radar.vercel.app", // Allow only your Vercel app
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // If you're using cookies or credentials
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Import Routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const challengeRoutes = require("./routes/challengeRoutes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/challenges", challengeRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
