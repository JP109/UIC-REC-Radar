// services/confidenceService.js

const supabase = require("../config/supabaseClient");

// Helper function to update user confidence based on interactions
async function updateUserConfidence() {
  try {
    // Fetch all users from the database
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, confidence_level");
    if (usersError) throw usersError;

    // Fetch user interactions (challenges) from the database
    const { data: interactions, error: interactionsError } = await supabase
      .from("user_interactions")
      .select("*");
    if (interactionsError) throw interactionsError;

    // Initialize a map to store the new confidence levels
    let confidenceMap = new Map();

    // For each interaction, calculate the confidence based on opponent's confidence
    interactions.forEach((interaction) => {
      const { user_id, opponent_id, interaction_count } = interaction;

      // Fetch the confidence levels of both users
      const user = users.find((u) => u.id === user_id);
      const opponent = users.find((u) => u.id === opponent_id);

      if (user && opponent) {
        const userConfidence = user.confidence_level;
        const opponentConfidence = opponent.confidence_level;

        // Adjust the confidence of both players based on interaction count and opponent's confidence
        let updatedUserConfidence =
          userConfidence + opponentConfidence * interaction_count;
        let updatedOpponentConfidence =
          opponentConfidence + userConfidence * interaction_count;

        // Store updated confidence
        confidenceMap.set(user_id, updatedUserConfidence);
        confidenceMap.set(opponent_id, updatedOpponentConfidence);
      }
    });

    // Update the users' confidence levels in the database
    for (const [userId, newConfidence] of confidenceMap.entries()) {
      const { error: updateError } = await supabase
        .from("users")
        .update({ confidence_level: newConfidence })
        .eq("id", userId);

      if (updateError) throw updateError;
    }

    console.log("User confidence levels updated successfully.");
  } catch (err) {
    console.error("Error updating user confidence levels:", err);
  }
}

// Export the function
module.exports = {
  updateUserConfidence,
};
