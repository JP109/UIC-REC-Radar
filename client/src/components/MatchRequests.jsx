import { useState, useEffect } from "react";

const MatchRequests = () => {
  const [challenges, setChallenges] = useState(null); // State to hold the challenge details
  useEffect(() => {
    fetch(`https://uic-rec-radar.onrender.com/api/challenges/1`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching challenge: ${response.statusText}`);
        }
        console.log("LLLLL", response);

        return response.json();
      })
      .then((data) => {
        setChallenges(data);
        console.log(data);
      });
  }, []);
  return (
    <div>
      <h1>Upcoming matches</h1>
      {challenges ? (
        challenges.map((user) => (
          <div
            key={user.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {user.challenger_name}
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {/* {user.tier} tier */}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {/* • */}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {/* {user.points} points */}
                </span>
              </div>
            </div>
            <button
              onClick={() => openChallengeModal(user)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Start Match
            </button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MatchRequests;
