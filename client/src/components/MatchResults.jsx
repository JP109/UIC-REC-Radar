/* eslint-disable react/prop-types */
import { useState } from "react";
import { Trophy, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { pointsService } from "../services/pointsService";
import { locationService } from "../services/locationService";
import { usePoints } from "../context/PointsContext";

const MatchResults = ({ match, onMatchComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [winner, setWinner] = useState(null);
  const { updatePoints } = usePoints();
  const token = localStorage.getItem("authToken");

  const handleWinnerSelection = (selectedWinnerId) => {
    setWinner(selectedWinnerId);
  };

  const handleSubmitResult = async () => {
    if (!winner) {
      toast.error("Please select a winner");
      return;
    }

    try {
      setIsSubmitting(true);
      const loadingToast = toast.loading("Verifying location...");

      // Check if user is at the REC center
      const isAtRecCenter = await locationService.isNearRECCenter();

      if (!isAtRecCenter) {
        toast.error("You must be at the REC center to submit match results", {
          id: loadingToast,
          duration: 4000,
        });
        return;
      }

      // Update loading message
      toast.loading("Submitting match results...", {
        id: loadingToast,
      });

      const loserId =
        winner === match.challenged_id
          ? match.challenger_id
          : match.challenged_id;

      const winnerPoints = await pointsService.determinePointsToUpdate(
        winner,
        loserId
      );
      const loserPoints = -winnerPoints;

      await Promise.all([
        pointsService.updatePoints(winner, winnerPoints),
        pointsService.updatePoints(loserId, loserPoints),
      ]);

      // Fetch updated points after the match result is submitted
      const response = await fetch(
        `https://uic-rec-radar.onrender.com/api/users/points`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      updatePoints(data.points);

      toast.success("Match results recorded successfully!", {
        id: loadingToast,
      });

      if (onMatchComplete) {
        onMatchComplete(match);
      }
    } catch (error) {
      toast.error(error.message || "Failed to submit match results");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Match Results
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => handleWinnerSelection(match.challenged_id)}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              winner === match.challenged_id
                ? "bg-green-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            }`}
            disabled={isSubmitting}
          >
            <Trophy className="h-4 w-4" />
            <span>You Won</span>
          </button>
          <button
            onClick={() => handleWinnerSelection(match.challenger_id)}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              winner === match.challenger_id
                ? "bg-green-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            }`}
            disabled={isSubmitting}
          >
            <Trophy className="h-4 w-4" />
            <span>{match.challenger_name} Won</span>
          </button>
        </div>

        <button
          onClick={handleSubmitResult}
          disabled={!winner || isSubmitting}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <Loader className="animate-spin h-4 w-4" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Trophy className="h-4 w-4" />
              <span>Submit Results</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MatchResults;
