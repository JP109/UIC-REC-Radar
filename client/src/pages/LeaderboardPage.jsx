import { Trophy, Medal, Award } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const LeaderboardPage = () => {
  const token = localStorage.getItem("authToken");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Keep track of the current page
  const playersPerPage = 6; // Number of players per page

  useEffect(() => {
    const fetchUsers = async () => {
      // setUSerDataLoading(true);
      try {
        const response = await fetch(
          "https://uic-rec-radar.onrender.com/api/users",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(data); // Set the fetched users
      } catch (err) {
        toast.error(err.message);
      } finally {
        // setUSerDataLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-700" />;
      default:
        return (
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {rank}
          </span>
        );
    }
  };

  const totalPages = Math.ceil(users.length / playersPerPage); // Calculate total pages

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentPlayers = users.slice(
    currentPage * playersPerPage,
    (currentPage + 1) * playersPerPage
  ); // Get the players for the current page

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Leaderboard
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="divide-y dark:divide-gray-700">
          {currentPlayers.map((player, index) => (
            <div
              key={player.id}
              className="p-4 flex items-center space-x-4 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="w-8 flex justify-center">
                {getRankIcon(
                  currentPage * playersPerPage + index < 3
                    ? currentPage * playersPerPage + index + 1
                    : null
                )}
              </div>

              <div className="flex-grow">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {player.name}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {player.tier} tier
                </span>
              </div>

              <div className="text-right">
                <span className="font-bold text-lg text-gray-900 dark:text-white">
                  {player.points}
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  points
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded ${
            currentPage === 0
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700 dark:text-gray-300">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
          className={`px-4 py-2 rounded ${
            currentPage >= totalPages - 1
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeaderboardPage;
