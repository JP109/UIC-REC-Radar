/* eslint-disable react/prop-types */
import { useState } from "react";
import { Trophy, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { pointsService } from "../services/pointsService";

const MatchResults = ({ match, onMatchComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [winner, setWinner] = useState(null);

  const handleSubmitResult = async () => {
    if (!winner) {
      toast.error("Please select a winner");
      return;
    }

    try {
      setIsSubmitting(true);
      const loadingToast = toast.loading("Submitting match results...");

      // const result = await pointsService.handleMatchCompletion({
      //   winnerId: winner,
      //   loserId:
      //     winner === match.challenged_id
      //       ? match.challenged_id
      //       : match.challenger_id,
      //   matchId: match.id,
      // });

      // Determine point updates based on the winner
      const winnerPoints = 5;
      const loserPoints = -5;

      // Send points update requests to the API
      await Promise.all([
        fetch(`https://uic-rec-radar.onrender.com/api/users/${winner}/points`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ points: winnerPoints }),
        }),
        fetch(
          `https://uic-rec-radar.onrender.com/api/users/${
            winner === match.challenged_id
              ? match.challenger_id
              : match.challenged_id
          }/points`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ points: loserPoints }),
          }
        ),
      ]);

      toast.success("Match results recorded successfully!", {
        id: loadingToast,
      });

      if (onMatchComplete) {
        onMatchComplete(match);
      }
    } catch (error) {
      toast.error("Failed to submit match results", error);
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
            onClick={() => setWinner(match.challenged_id)}
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
            onClick={() => setWinner(match.challenger_id)}
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
