import { Trophy } from "lucide-react";
import BaseCard from "./BaseCard";

const LeaderboardCard = () => {
  return (
    <BaseCard
      to="/leaderboard"
      icon={Trophy}
      title="Leaderboard"
      description="View top players"
      bgColor="bg-purple-500"
      darkBgColor="dark:bg-purple-700"
    />
  );
};

export default LeaderboardCard;
