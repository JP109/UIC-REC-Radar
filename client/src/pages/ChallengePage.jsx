// src/pages/ChallengePage.jsx
import { useState } from "react";
import { Search, Loader } from "lucide-react";
import ChallengeModal from "../components/ChallengeModal";
import { challengeService } from "../services";
const ChallengePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);

  // Mock data
  const users = [
    { id: 1, name: "John Doe", tier: "bronze", points: 100 },
    { id: 2, name: "Jane Smith", tier: "gold", points: 500 },
  ];

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
        challengedUserId: selectedUser.id,
        time: selectedTime,
        court: selectedCourt,
        date: new Date().toISOString(),
      };

      await challengeService.sendChallenge(challengeData);
      // a success toast/notification here
    } catch (err) {
      // error handling
      throw err;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Challenge Players
      </h1>

      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

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
          <option value="gold">Gold</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {user.name}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                {user.tier} tier
              </span>
            </div>
            <button
              onClick={() => openChallengeModal(user)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Challenge
            </button>
          </div>
        ))}
      </div>

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
