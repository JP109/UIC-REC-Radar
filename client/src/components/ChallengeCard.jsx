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
      />
    </div>
  );
};

export default ChallengeCard;
