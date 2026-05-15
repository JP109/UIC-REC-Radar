import { Trophy, Medal, Award, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config";

const LeaderboardPage = () => {
  const token = localStorage.getItem("authToken");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const playersPerPage = 6;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/users`,
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
        setUsers(data);
      } catch (err) {
        toast.error(err.message);
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
          <span className="text-lg font-bold text-gray-500 dark:text-gray-400">
            {rank}
          </span>
        );
    }
  };

  const totalPages = Math.ceil(users.length / playersPerPage);
  const showPagination = totalPages > 1;

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const currentPlayers = users.slice(
    currentPage * playersPerPage,
    (currentPage + 1) * playersPerPage
  );

  return (
    <div className="space-y-6">
      <div>
        <Link to="/app" className="inline-flex items-center text-xs text-gray-500 hover:text-uic-navy dark:hover:text-white transition-colors mb-2">
          <ArrowLeft className="h-3 w-3 mr-1" /> Home
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold text-uic-navy dark:text-white pb-2 border-b-2 border-uic-red">
          Leaderboard
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {currentPlayers.map((player, index) => {
            const globalRank = currentPage * playersPerPage + index + 1;
            return (
              <div
                key={player.id}
                className="p-4 flex items-center space-x-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="w-8 flex justify-center">
                  {getRankIcon(globalRank)}
                </div>

                <div className="flex-grow">
                  <h3 className="font-semibold text-uic-navy dark:text-white">
                    {player.name}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                    {player.tier} Tier
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-bold text-lg text-uic-navy dark:text-white">
                    {player.points}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    points
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showPagination && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className="px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed bg-uic-navy text-white hover:bg-uic-navy-light transition-colors duration-200"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages - 1}
            className="px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed bg-uic-navy text-white hover:bg-uic-navy-light transition-colors duration-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;
