import { Trophy } from "lucide-react";
import BaseCard from "./BaseCard";

const LeaderboardCard = () => {
  return (
    <div id="leaderboard-card">
      <BaseCard
        to="/leaderboard"
        icon={Trophy}
        title="Leaderboard"
        description="View top players"
      />
    </div>
  );
};

export default LeaderboardCard;
