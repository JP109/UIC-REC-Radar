import { Users } from "lucide-react";
import BaseCard from "./BaseCard";

const ChallengeCard = () => {
  return (
    <div id="challenge-card">
      <BaseCard
        to="/challenge"
        icon={Users}
        title="Challenge"
        description="Challenge other players to matches"
        bgColor="bg-blue-500"
        darkBgColor="dark:bg-blue-700"
      />
    </div>
  );
};

export default ChallengeCard;
