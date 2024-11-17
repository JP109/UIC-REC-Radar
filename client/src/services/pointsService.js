const API_BASE_URL = "https://uic-rec-radar.onrender.com/api/users";

const TIER_THRESHOLDS = {
  BRONZE: 0,
  SILVER: 100,
  GOLD: 300,
  PLATINUM: 1000,
};

const MATCH_POINTS = 5;

export const pointsService = {
  /**
   * Update user points.
   * @param {string} userId - The ID of the user.
   * @param {number} points - The points to update.
   * @returns {Promise<void>}
   */
  updatePoints: async (userId, points) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${userId}/points`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ points }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update points for user ${userId}`);
      }
    } catch (error) {
      console.error(`Error updating points for user ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Calculate user's tier based on points.
   * @param {number} points - The user's total points.
   * @returns {string} - The user's tier.
   */
  calculateTier: (points) => {
    if (points >= TIER_THRESHOLDS.PLATINUM) return "platinum";
    if (points >= TIER_THRESHOLDS.GOLD) return "gold";
    if (points >= TIER_THRESHOLDS.SILVER) return "silver";
    return "bronze";
  },

  /**
   * Handle match completion and point transfer.
   * @param {Object} matchData - Match details including winner and loser IDs.
   * @returns {Promise<Object>} - Result of the match processing.
   */
  handleMatchCompletion: async (matchData) => {
    const { winnerId, loserId, matchId } = matchData;

    try {
      // Update points for winner and loser
      await Promise.all([
        pointsService.updatePoints(winnerId, MATCH_POINTS),
        pointsService.updatePoints(loserId, -MATCH_POINTS),
      ]);

      // Simulate backend point totals
      const winnerNewTotal = MATCH_POINTS; // Replace with backend result
      const loserNewTotal = -MATCH_POINTS; // Replace with backend result

      // Calculate new tiers
      const winnerNewTier = pointsService.calculateTier(winnerNewTotal);
      const loserNewTier = pointsService.calculateTier(loserNewTotal);

      return {
        success: true,
        winner: {
          userId: winnerId,
          pointsChange: +MATCH_POINTS,
          newTotal: winnerNewTotal,
          newTier: winnerNewTier,
        },
        loser: {
          userId: loserId,
          pointsChange: -MATCH_POINTS,
          newTotal: loserNewTotal,
          newTier: loserNewTier,
        },
        matchId,
      };
    } catch (error) {
      throw new Error("Failed to process match results");
    }
  },

  /**
   * Verify if a match can be officially started.
   * @param {Object} matchData - Match details including player IDs and court ID.
   * @returns {Promise<Object>} - Match verification result.
   */
  verifyMatchStart: async (matchData) => {
    try {
      const { player1Id, player2Id, courtId } = matchData;

      // Verify both players' locations
      const [player1Location, player2Location] = await Promise.all([
        locationService.isNearRECCenter(player1Id), // Ensure function accepts player ID
        locationService.isNearRECCenter(player2Id), // Ensure function accepts player ID
      ]);

      if (!player1Location || !player2Location) {
        throw new Error(
          "Both players must be at the REC center to start the match"
        );
      }

      return {
        success: true,
        matchId: "generated-match-id", // Simulate or generate match ID
        courtId,
        startTime: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Match start verification failed:", error);
      throw error;
    }
  },

  /**
   * Determine the points to update based on users' confidence levels.
   * @param {string} winnerId - The ID of the winner.
   * @param {string} loserId - The ID of the loser.
   * @returns {Promise<number>} - The points to update (updateWith).
   */
  determinePointsToUpdate: async (winnerId, loserId) => {
    try {
      // Fetch user data from the API
      const [winnerResponse, loserResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/${winnerId}`),
        fetch(`${API_BASE_URL}/${loserId}`),
      ]);

      if (!winnerResponse.ok) {
        throw new Error(
          `Failed to fetch winner's data: ${winnerResponse.statusText}`
        );
      }
      if (!loserResponse.ok) {
        throw new Error(
          `Failed to fetch loser's data: ${loserResponse.statusText}`
        );
      }

      const winnerData = await winnerResponse.json();
      const loserData = await loserResponse.json();

      console.log(winnerData, loserData);

      const winnerConfidence = winnerData.confidence_level || 0; // Default to 0 if null
      const loserConfidence = loserData.confidence_level || 0;

      // Calculate the updateWith value based on confidence levels
      const confidenceAverage = (winnerConfidence + loserConfidence) / 2;

      // Scale updateWith value based on confidence average
      const updateWith =
        confidenceAverage > 80
          ? 10 // High confidence, large reward
          : confidenceAverage > 50
          ? 7 // Medium confidence, medium reward
          : 5; // Low confidence, small reward

      return updateWith;
    } catch (error) {
      console.error("Error determining points to update:", error);
      throw error;
    }
  },
};

export default pointsService;
