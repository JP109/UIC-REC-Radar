import { Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const LeaderboardCard = () => {
  return (
    <Link
      to="/leaderboard"
      className="transform transition-all duration-200 hover:scale-105"
    >
      <div className="bg-purple-500 rounded-lg shadow-lg p-6 text-white">
        <div className="flex flex-col items-center text-center space-y-4">
          <Trophy className="h-8 w-8" />
          <h2 className="text-2xl font-bold">Leaderboard</h2>
          <p className="text-sm opacity-90">View top players</p>
        </div>
      </div>
    </Link>
  );
};

export default LeaderboardCard;