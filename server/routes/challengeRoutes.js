// routes/challengeRoutes.js
const express = require("express");
const router = express.Router();
const supabase = require("../config/supabaseClient");

// Send a challenge
router.post("/", async (req, res) => {
  const { challengerId, challengerName, challengedId, date, time } = req.body;
  try {
    const { data, error } = await supabase.from("challenges").insert([
      {
        challenger_id: challengerId,
        challenger_name: challengerName,
        challenged_id: challengedId,
        challenge_date: date,
        challenge_time: time,
        status: "pending",
      },
    ]);
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ error: "Error sending challenge request" });
  }
});

// Get a specific challenge by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("challenges")
      .select("*")
      .eq("challenged_id", Number(id));
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching challenge" });
  }
});

// Update challenge status to "completed" and update points (example of resolving a challenge)
router.put("/complete/:id", async (req, res) => {
  const { id } = req.params;
  const { winnerId } = req.body;

  try {
    // Get challenge data
    const { data: challenge, error: challengeError } = await supabase
      .from("challenges")
      .select("*")
      .eq("id", id)
      .single();

    if (challengeError) throw challengeError;
    if (!challenge)
      return res.status(404).json({ error: "Challenge not found" });

    // Update challenge status to "completed"
    const { error: updateChallengeError } = await supabase
      .from("challenges")
      .update({ status: "completed" })
      .eq("id", id);

    if (updateChallengeError) throw updateChallengeError;

    // Identify the loser
    const loserId =
      winnerId === challenge.challenger_id
        ? challenge.challenged_id
        : challenge.challenger_id;

    // Fetch winner's and loser's current points
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, points")
      .in("id", [winnerId, loserId]);

    if (usersError) throw usersError;

    // Map points to respective users
    const winner = users.find((user) => user.id === winnerId);
    const loser = users.find((user) => user.id === loserId);

    const winnerPoints = (winner?.points || 0) + 5;
    const loserPoints = (loser?.points || 0) - 5;

    // Update winner's points
    const { error: winnerUpdateError } = await supabase
      .from("users")
      .update({ points: winnerPoints })
      .eq("id", winnerId);

    if (winnerUpdateError) throw winnerUpdateError;

    // Update loser's points
    const { error: loserUpdateError } = await supabase
      .from("users")
      .update({ points: loserPoints })
      .eq("id", loserId);

    if (loserUpdateError) throw loserUpdateError;

    res.json({ message: "Challenge completed" });
  } catch (err) {
    console.error("Error completing challenge:", err);
    res.status(500).json({ error: "Error completing challenge" });
  }
});

module.exports = router;
