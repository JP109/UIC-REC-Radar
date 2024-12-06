import { useState, useEffect } from "react";
import ChallengeCard from "../components/ChallengeCard";
import OccupancyCard from "../components/OccupancyCard";
import LeaderboardCard from "../components/LeaderboardCard";
import LocationCheckin from "../components/LocationCheckin";
import MatchRequests from "../components/MatchRequests";
import AppTutorial from "../components/AppTutorial";

const MainPage = () => {
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const checkTutorial = () => {
      const tutorialCompleted = localStorage.getItem("tutorialCompleted");
      const justRegistered = localStorage.getItem("justRegistered");

      console.log("Tutorial Status:", {
        tutorialCompleted,
        justRegistered,
      });

      if (tutorialCompleted !== "true" && justRegistered === "true") {
        console.log("Showing tutorial");
        setShowTutorial(true);
        localStorage.removeItem("justRegistered");
      }
    };

    // Small delay to ensure all elements are rendered
    const timer = setTimeout(checkTutorial, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    localStorage.setItem("tutorialCompleted", "true");
  };

  return (
    <div className="space-y-6">
      {/* Daily Check-in Section */}
      <div className="mb-8">
        <LocationCheckin id="daily-checkin" />
      </div>

      {/* Main Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div id="challenge-card">
          <ChallengeCard />
        </div>
        <div id="occupancy-card">
          <OccupancyCard />
        </div>
        <div id="leaderboard-card">
          <LeaderboardCard />
        </div>
      </div>

      <div className="">
        <MatchRequests />
      </div>

      {showTutorial && <AppTutorial onComplete={handleTutorialComplete} />}
    </div>
  );
};

export default MainPage;
