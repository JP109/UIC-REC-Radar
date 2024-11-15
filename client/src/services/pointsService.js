const TIER_THRESHOLDS = {
  BRONZE: 0,
  SILVER: 100,
  GOLD: 300,
  PLATINUM: 1000,
};

const MATCH_POINTS = 5;

export const pointsService = {
  // Calculate user's tier based on points
  calculateTier: (points) => {
    if (points >= TIER_THRESHOLDS.PLATINUM) return "platinum";
    if (points >= TIER_THRESHOLDS.GOLD) return "gold";
    if (points >= TIER_THRESHOLDS.SILVER) return "silver";
    return "bronze";
  },

  // Handle match completion and point transfer
  handleMatchCompletion: async (matchData) => {
    const { winnerId, loserId, matchId } = matchData;

    try {
      // This would be replaced with actual API calls
      const result = {
        success: true,
        winner: {
          userId: winnerId,
          pointsChange: +MATCH_POINTS,
          newTotal: 0, // Would come from backend
          newTier: "",
        },
        loser: {
          userId: loserId,
          pointsChange: -MATCH_POINTS,
          newTotal: 0, // Would come from backend
          newTier: "",
        },
        matchId,
      };

      // Simulate backend calculation
      result.winner.newTier = pointsService.calculateTier(
        result.winner.newTotal
      );
      result.loser.newTier = pointsService.calculateTier(result.loser.newTotal);

      return result;
    } catch (error) {
      throw new Error("Failed to process match results");
    }
  },

  // Verify if match can be officially started
  verifyMatchStart: async (matchData) => {
    try {
      const { player1Id, player2Id, courtId } = matchData;

      // Verify both players' locations
      const [player1Location, player2Location] = await Promise.all([
        locationService.isNearRECCenter(),
        locationService.isNearRECCenter(),
      ]);

      if (!player1Location || !player2Location) {
        throw new Error(
          "Both players must be at the REC center to start the match"
        );
      }

      return {
        success: true,
        matchId: "generated-match-id",
        courtId,
        startTime: new Date().toISOString(),
      };
    } catch (error) {
      throw error;
    }
  },
};

export default pointsService;
