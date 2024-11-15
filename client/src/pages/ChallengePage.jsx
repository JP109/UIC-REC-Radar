import { useState, useEffect } from "react";
import { Search, Info } from "lucide-react";
import ChallengeModal from "../components/ChallengeModal";
import MatchResults from "../components/MatchResults";
import { challengeService } from "../services";
import toast from "react-hot-toast";

const ChallengePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userDataLoading, setUSerDataLoading] = useState(false);
  const [activeMatches, setActiveMatches] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setUSerDataLoading(true);
      try {
        const response = await fetch(
          "https://uic-rec-radar.onrender.com/api/users"
        );
        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(data); // Set the fetched users
      } catch (err) {
        toast.error(err.message);
      } finally {
        setUSerDataLoading(false);
      }
    };

    fetchUsers();
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

  const handleChallengeSubmit = async ({ selectedTime, selectedCourt }) => {
    try {
      const challengeData = {
        challengerId: "1",
        challengerName: "Jai Pawar",
        challengedId: selectedUser.id,
        time: selectedTime,
        // court: selectedCourt,
        date: new Date().toISOString(),
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
      {activeMatches.length > 0 && (
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
      )}

      {/* Challenge Players Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Challenge Players
        </h2>

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
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {user.tier} tier
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      •
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {user.points} points
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => openChallengeModal(user)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
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
