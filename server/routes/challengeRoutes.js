// routes/challengeRoutes.js
const express = require("express");
const router = express.Router();
const supabase = require("../config/supabaseClient");

// Send a challenge
router.post("/", async (req, res) => {
  const { challengerId, challengedId, date, time } = req.body;
  try {
    const { data, error } = await supabase.from("challenges").insert([
      {
        challenger_id: challengerId,
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
      .eq("id", id)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching challenge" });
  }
});

// Update challenge status to "completed" and update points (example of resolving a challenge)
router.put("/complete/:id", async (req, res) => {
  const { id } = req.params;
  const { winnerId } = req.body; // Pass the winner's ID to update points

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

    // Update the challenge status to completed
    const { data: updatedChallenge, error: updateChallengeError } =
      await supabase
        .from("challenges")
        .update({ status: "completed" })
        .eq("id", id);

    if (updateChallengeError) throw updateChallengeError;

    // Update points for winner and loser
    const loserId =
      winnerId === challenge.challenger_id
        ? challenge.challenged_id
        : challenge.challenger_id;

    // Update winner's points
    const { data: winnerData, error: winnerError } = await supabase
      .from("users")
      .update({ points: supabase.raw("points + 5") })
      .eq("id", winnerId);

    if (winnerError) throw winnerError;

    // Update loser's points (reduce points)
    const { data: loserData, error: loserError } = await supabase
      .from("users")
      .update({ points: supabase.raw("points - 5") })
      .eq("id", loserId);

    if (loserError) throw loserError;

    res.json({ message: "Challenge completed", updatedChallenge });
  } catch (err) {
    res.status(500).json({ error: "Error completing challenge" });
  }
});

module.exports = router;
