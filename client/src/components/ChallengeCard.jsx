import { Users } from "lucide-react";
import { Link } from "react-router-dom";

const ChallengeCard = () => {
  return (
    <Link
      to="/challenge"
      className="transform transition-all duration-200 hover:scale-105"
    >
      <div className="bg-blue-500 rounded-lg shadow-lg p-6 text-white">
        <div className="flex flex-col items-center text-center space-y-4">
          <Users className="h-8 w-8" />
          <h2 className="text-2xl font-bold">Challenge</h2>
          <p className="text-sm opacity-90">
            Challenge other players to matches
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ChallengeCard;
