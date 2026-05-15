import { useState, useEffect } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ChallengeModal from "../components/ChallengeModal";
import { challengeService } from "../services";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config";

const ChallengePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userDataLoading, setUSerDataLoading] = useState(false);
  const [activeMatches, setActiveMatches] = useState([]);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("authToken");
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();

  const handleAuthError = (status) => {
    if (status === 401 || status === 403) {
      localStorage.setItem("isAuthenticated", "false");
      localStorage.removeItem("authToken");
      toast.error("Session expired — please log in again");
      navigate("/auth");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setUSerDataLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/users`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 401 || response.status === 403) {
          handleAuthError(response.status);
          return;
        }
        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setUSerDataLoading(false);
      }
    };
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/users/user`,
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
        setCurrentUser(data); // Set the fetched users
      } catch (err) {
        toast.error(err.message);
      }
    };
    fetchUsers();
    fetchCurrentUser();
  }, []);

  // Mock active matches - In reality, this would come from your API
  useEffect(() => {
    const fetchActiveMatches = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        const matches = [
          {
            id: 1,
            player1Id: "current-user-id",
            player2Id: "opponent-id",
            player1Name: "You",
            player2Name: "John Doe",
            court: "Court 1",
            startTime: new Date().toISOString(),
            status: "in_progress",
          },
          // Add more mock matches if needed
        ];
        setActiveMatches(matches);
      } catch (error) {
        toast.error("Failed to load active matches", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveMatches();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedTier === "all" || user.tier === selectedTier)
  );

  const openChallengeModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeChallengeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleChallengeSubmit = async ({ selectedTime, selectedDate }) => {
    try {
      const challengeData = {
        challengerId: currentUser.id,
        challengerName: currentUser.name,
        challengedId: selectedUser.id,
        time: selectedTime,
        date: selectedDate,
      };

      await challengeService.sendChallenge(challengeData);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const handleMatchComplete = async (result) => {
    try {
      // In reality, this would be an API call to update the match status
      setActiveMatches((prevMatches) =>
        prevMatches.filter((match) => match.id !== result.matchId)
      );

      toast.success("Match results recorded successfully!");
    } catch (error) {
      toast.error("Failed to update match status", error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Active Matches Section */}
      {/* {activeMatches.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
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
            {activeMatches.map((match) => (
              <MatchResults
                key={match.id}
                match={match}
                onMatchComplete={handleMatchComplete}
              />
            ))}
          </div>
        </div>
      )} */}

      {/* Challenge Players Section */}
      <div className="space-y-6">
        <div>
          <Link
            to="/app"
            className="inline-flex items-center text-xs text-gray-500 hover:text-uic-navy dark:hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="h-3 w-3 mr-1" /> Home
          </Link>
          <h2 className="text-xl sm:text-2xl font-bold text-uic-navy dark:text-white pb-2 border-b-2 border-uic-red">
            Challenge Players
          </h2>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search players..."
              className="w-full pl-10 pr-4 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
          >
            <option value="all">All Tiers</option>
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
          </select>
        </div>

        {/* Players List */}
        <div className="grid gap-4">
          {userDataLoading ? (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              Loading players...
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              No players found
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center hover:border-uic-red transition-colors duration-200"
              >
                <div>
                  <h3 className="font-semibold text-uic-navy dark:text-white">
                    {user.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {user.tier} Tier
                    </span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {user.points} pts
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => openChallengeModal(user)}
                  className="px-4 py-2 bg-uic-red text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
                >
                  Challenge
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Challenge Modal */}
      <ChallengeModal
        isOpen={isModalOpen}
        onClose={closeChallengeModal}
        selectedUser={selectedUser}
        onSubmit={handleChallengeSubmit}
      />
    </div>
  );
};

export default ChallengePage;
