import { useState } from "react";
import { Search } from "lucide-react";

const ChallengePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState("all");

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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Challenge Players
      </h1>

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
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Challenge
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengePage;