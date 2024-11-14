import { Trophy, Medal, Award } from "lucide-react";

const LeaderboardPage = () => {
  // Mock data
  const players = [
    { id: 1, name: "John Doe", points: 1200, tier: "gold", rank: 1 },
    { id: 2, name: "Jane Smith", points: 1100, tier: "gold", rank: 2 },
    { id: 3, name: "Mike Johnson", points: 1000, tier: "gold", rank: 3 },
    // Add more players...
  ];

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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Leaderboard
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="divide-y dark:divide-gray-700">
          {players.map((player) => (
            <div
              key={player.id}
              className="p-4 flex items-center space-x-4 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="w-8 flex justify-center">
                {getRankIcon(player.rank)}
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
    </div>
  );
};

export default LeaderboardPage;
