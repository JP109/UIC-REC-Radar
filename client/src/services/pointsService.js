const API_BASE_URL = "https://uic-rec-radar.onrender.com/api/users";
import toast from "react-hot-toast";

const TIER_THRESHOLDS = {
  BRONZE: 0,
  SILVER: 100,
  GOLD: 300,
};

// const MATCH_POINTS = 5;

export const pointsService = {
  /**
   * Update user points and show appropriate toast notification
   * @param {string} userId - The ID of the user
   * @param {number} points - The points to update (positive for gain, negative for loss)
   * @returns {Promise<void>}
   */
  updatePoints: async (userId, points) => {
    try {
      const loadingToast = toast.loading(
        points > 0 ? "Adding points..." : "Updating points..."
      );

      const response = await fetch(`${API_BASE_URL}/${userId}/points`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ points }),
      });

      // console.log("POINTS SERVICE RESPONSE", response);

      if (!response.ok) {
        throw new Error(`Failed to update points for user ${userId}`);
      }

      // response.formData.points;

      // Show success toast with appropriate message and icon
      if (points > 0) {
        toast.success(`Gained ${points} points! 🎉`, {
          id: loadingToast,
          icon: "📈",
          duration: 3000,
        });
      } else {
        toast.error(`Lost ${Math.abs(points)} points`, {
          id: loadingToast,
          icon: "📉",
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error(`Error updating points: ${error.message}`);
      console.error(`Error updating points for user ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Calculate user's tier based on points and show toast if tier changes
   * @param {number} points - The user's total points
   * @param {number} previousPoints - The user's previous points total
   * @returns {string} - The user's tier
   */
  calculateTier: (points, previousPoints) => {
    const getTier = (p) => {
      if (p >= TIER_THRESHOLDS.GOLD) return "gold";
      if (p >= TIER_THRESHOLDS.SILVER) return "silver";
      return "bronze";
    };

    const newTier = getTier(points);
    const oldTier = getTier(previousPoints);

    // Show toast if user has reached a new tier
    if (newTier !== oldTier && points > previousPoints) {
      toast.success(
        `Congratulations! You've reached ${newTier.toUpperCase()} tier! 🏆`,
        {
          duration: 5000,
          icon: "🌟",
        }
      );
    }

    return newTier;
  },

  /**
   * Handle match completion and point transfer with appropriate notifications
   * @param {Object} matchData - Match details including winner and loser IDs
   * @returns {Promise<Object>} - Result of the match processing
   */
  handleMatchCompletion: async (matchData) => {
    const { winnerId, loserId, matchId } = matchData;

    try {
      // Calculate points to award based on confidence levels
      const pointsToAward = await pointsService.determinePointsToUpdate(
        winnerId,
        loserId
      );

      // Update points for both players
      await Promise.all([
        pointsService.updatePoints(winnerId, pointsToAward),
        pointsService.updatePoints(loserId, -pointsToAward),
      ]);

      // Get updated totals
      const [winnerData, loserData] = await Promise.all([
        fetch(`${API_BASE_URL}/${winnerId}`).then((res) => res.json()),
        fetch(`${API_BASE_URL}/${loserId}`).then((res) => res.json()),
      ]);

      // Calculate new tiers
      const winnerNewTier = pointsService.calculateTier(
        winnerData.points,
        winnerData.points - pointsToAward
      );
      const loserNewTier = pointsService.calculateTier(
        loserData.points,
        loserData.points + pointsToAward
      );

      return {
        success: true,
        winner: {
          userId: winnerId,
          pointsChange: pointsToAward,
          newTotal: winnerData.points,
          newTier: winnerNewTier,
        },
        loser: {
          userId: loserId,
          pointsChange: -pointsToAward,
          newTotal: loserData.points,
          newTier: loserNewTier,
        },
        matchId,
      };
    } catch (error) {
      toast.error("Failed to process match results");
      throw new Error("Failed to process match results", error);
    }
  },

  // Rest of the service methods remain unchanged...
  determinePointsToUpdate: async (winnerId, loserId) => {
    try {
      const [winnerResponse, loserResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/${winnerId}`),
        fetch(`${API_BASE_URL}/${loserId}`),
      ]);

      if (!winnerResponse.ok || !loserResponse.ok) {
        throw new Error("Failed to fetch user data");
      }

      const winnerData = await winnerResponse.json();
      const loserData = await loserResponse.json();

      const winnerConfidence = winnerData.confidence_level || 0;
      const loserConfidence = loserData.confidence_level || 0;
      const confidenceAverage = (winnerConfidence + loserConfidence) / 2;

      return confidenceAverage > 80 ? 10 : confidenceAverage > 50 ? 7 : 5;
    } catch (error) {
      console.error("Error determining points to update:", error);
      throw error;
    }
  },
};

export default pointsService;
