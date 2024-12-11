import { useState, useEffect } from "react";
import MatchResults from "../components/MatchResults";
import { Search, Info } from "lucide-react";

const MatchRequests = () => {
  const [challenges, setChallenges] = useState(null); // State to hold the challenge details
  const [activeMatches, setActiveMatches] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetch(`https://uic-rec-radar.onrender.com/api/challenges`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching challenge: ${response.statusText}`);
        }

        return response.json();
      })
      .then((data) => {
        setChallenges(data);
        console.log(data);
      });
  }, []);

  const handleMatchComplete = async (matchId) => {
    try {
      setChallenges((prevChallenges) =>
        prevChallenges.filter((match) => match.id !== matchId)
      );

      toast.success("Match results recorded successfully!");
    } catch (error) {
      toast.error("Failed to update match status", error);
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white pb-5 pt-5">
          Active Matches
        </h2>
        <div className="group relative">
          <Info className="h-4 w-4 text-gray-400 cursor-help" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-48 text-center">
            Submit match results once the game is complete
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        {challenges ? (
          challenges.map((match) => (
            <MatchResults
              key={match.id}
              match={match}
              onMatchComplete={() => handleMatchComplete(match.id)}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default MatchRequests;
