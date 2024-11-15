import ChallengeCard from "../components/ChallengeCard";
import OccupancyCard from "../components/OccupancyCard";
import LeaderboardCard from "../components/LeaderboardCard";
import LocationCheckin from "../components/LocationCheckin";
import MatchRequests from "../components/MatchRequests";

const MainPage = () => {
  return (
    <div className="space-y-6">
      {/* Daily Check-in Section */}
      <div className="mb-8">
        <LocationCheckin />
      </div>

      {/* Main Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ChallengeCard />
        <OccupancyCard />
        <LeaderboardCard />
      </div>

      <div className="">
        <MatchRequests />
      </div>
    </div>
  );
};

export default MainPage;
