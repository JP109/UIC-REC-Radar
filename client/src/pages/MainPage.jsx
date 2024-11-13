import ChallengeCard from "../components/ChallengeCard";
import OccupancyCard from "../components/OccupancyCard";
import LeaderboardCard from "../components/LeaderboardCard";

const MainPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ChallengeCard />
      <OccupancyCard />
      <LeaderboardCard />
    </div>
  );
};

export default MainPage;
