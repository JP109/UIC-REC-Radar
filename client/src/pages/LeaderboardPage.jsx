import { Trophy, Medal, Award } from "lucide-react";

const LeaderboardPage = () => {
  // Mock data - replace with actual data from your backend
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
        return <span className="text-lg font-bold">{rank}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Leaderboard</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="divide-y">
          {players.map((player) => (
            <div
              key={player.id}
              className="p-4 flex items-center space-x-4 hover:bg-gray-50"
            >
              <div className="w-8 flex justify-center">
                {getRankIcon(player.rank)}
              </div>

              <div className="flex-grow">
                <h3 className="font-semibold">{player.name}</h3>
                <span className="text-sm text-gray-500 capitalize">
                  {player.tier} tier
                </span>
              </div>

              <div className="text-right">
                <span className="font-bold text-lg">{player.points}</span>
                <p className="text-sm text-gray-500">points</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
