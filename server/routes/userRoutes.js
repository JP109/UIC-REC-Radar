// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const supabase = require("../config/supabaseClient");

// Get all users including their points for leaderboard
router.get("/", async (req, res) => {
  try {
    console.log("Connecting to Supabase...");
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, points, tier") // Select relevant columns, including points
      .order("points", { ascending: false }); // Sort by points for leaderboard
    console.log("Supabase response:", data, error);
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Get a specific user by ID, including points
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, points") // Select relevant columns, including points
      .eq("id", id)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user" });
  }
});

// Create a new user with default points set to 0
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  try {
    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, points: 20 }]) // Initialize points to 0
      .single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: "Error creating user" });
  }
});

module.exports = router;
