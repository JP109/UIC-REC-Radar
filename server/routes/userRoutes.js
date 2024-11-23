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
      .select("id, name, email, points, confidence_level") // Select relevant columns, including points
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

// Get user points
router.get("/:id/points", async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the points for the specific user
    const { data, error } = await supabase
      .from("users")
      .select("points")
      .eq("id", id)
      .single();

    if (error) throw error;

    res.json({ points: data.points });
  } catch (err) {
    console.error("Error fetching user points:", err);
    res.status(500).json({ error: "Error fetching user points" });
  }
});

// Update user points with a fixed amount
router.put("/:id/points", async (req, res) => {
  const { id } = req.params;
  const { points } = req.body; // Expect points to be added in request body

  if (typeof points !== "number") {
    return res.status(400).json({ error: "Points must be a number" });
  }

  try {
    // Append the points to the current points for the specific user
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("points")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    const updatedPoints = user.points + points;

    const { data, error } = await supabase
      .from("users")
      .update({ points: updatedPoints })
      .eq("id", id);

    if (error) throw error;

    res.json({ message: "Points updated successfully", data });
  } catch (err) {
    console.error("Error updating user points:", err);
    res.status(500).json({ error: "Error updating user points" });
  }
});

// Update user points and confidence scores with a dynamic amount
router.put("/:id/confidence", async (req, res) => {
  const { id } = req.params;
  const { winnerId, loserId } = req.body; // Expect points to be added in request body

  if (typeof points !== "number") {
    return res.status(400).json({ error: "Points must be a number" });
  }

  try {
    const { winner, winnerError } = await supabase
      .from("users")
      .select("id, name, email, points, confidence_level") // Select relevant columns, including points
      .eq("id", winnerId)
      .single();

    const { loser, loserError } = await supabase
      .from("users")
      .select("id, name, email, points, confidence_level") // Select relevant columns, including points
      .eq("id", loserId)
      .single();

    const { allChallenges, challengeError } = await supabase
      .from("challenges")
      .select("*");

    const findMatchesBetweenUsers = (allChallenges, winnerId, loserId) => {
      return allChallenges.filter(
        (challenge) =>
          (challenge.challenger_id === winnerId &&
            challenge.challenged_id === loserId) ||
          (challenge.challenger_id === loserId &&
            challenge.challenged_id === winnerId)
      ).length;
    };

    const matchCount = findMatchesBetweenUsers(
      allChallenges,
      winnerId,
      loserId
    );

    const winnerConfidence = winner.confidence_level || 0; // Default to 0 if null
    const loserConfidence = loser.confidence_level || 0;

    // Calculate the updateWith value based on confidence levels
    const confidenceAverage = (winnerConfidence + loserConfidence) / 2;

    // Scale updateWith value based on confidence average
    const updateWith =
      confidenceAverage > 80
        ? 10 // High confidence, large reward
        : confidenceAverage > 50
        ? 7 // Medium confidence, medium reward
        : 5; // Low confidence, small reward

    const updateConfidenceWith =
      ((WinningUser.confidence_level + losingUser.confidence_level) /
        matchCount) *
      10;

    // Append the points to the current points for the specific user
    const { data: WinningUser, error: winUserError } = await supabase
      .from("users")
      .select("points, confidence_level")
      .eq("id", winnerId)
      .single();

    if (fetchError) throw fetchError;

    const winnerUpdatedPoints = WinningUser.points + updateWith;
    const winnerUpdatedConfidence =
      WinningUser.confidence_level + updateConfidenceWith;

    // Append the points to the current points for the specific user
    const { data: losingUser, error: fetchError } = await supabase
      .from("users")
      .select("points, confidence_level")
      .eq("id", winnerId)
      .single();

    if (fetchError) throw fetchError;

    const loserUpdatedPoints = losingUser.points - updateWith;
    const loserUpdatedConfidence =
      losingUser.confidence_level + updateConfidenceWith;

    const { data, error } = await supabase
      .from("users")
      .update({
        points: winnerUpdatedPoints,
        confidence_level: winnerUpdatedConfidence,
      })
      .eq("id", winnerId);

    if (error) throw error;
    // res.json({ message: "Points updated successfully", data });

    const { loserData, loserErr } = await supabase
      .from("users")
      .update({
        points: loserUpdatedPoints,
        confidence_level: loserUpdatedConfidence,
      })
      .eq("id", loserId);

    if (loserErr) throw error;
    // res.json({ message: "Points updated successfully", loserData });

    // update user confidence levels
  } catch (err) {
    console.error("Error updating user points:", err);
    res.status(500).json({ error: "Error updating user points" });
  }
});

module.exports = router;
