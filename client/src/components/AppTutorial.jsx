/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { TutorialStep } from "./TutorialStep";

const tutorialSteps = [
  {
    targetId: "navbar-logo",
    title: "Welcome to UIC REC RADAR!",
    description: "Click here anytime to return to the main dashboard.",
    position: "bottom",
  },
  {
    targetId: "challenge-card",
    title: "Challenge Players",
    description:
      "Find and challenge other players to matches. Compete and earn points!",
    position: "right",
  },
  {
    targetId: "occupancy-card",
    title: "Check Court Availability",
    description: "See real-time court occupancy before heading to the REC.",
    position: "bottom",
  },
  {
    targetId: "leaderboard-card",
    title: "Leaderboard",
    description: "Track your ranking and see how you compare to other players.",
    position: "left",
  },
  {
    targetId: "daily-checkin",
    title: "Daily Check-in",
    description: "Check in at the REC Center daily to earn bonus points!",
    position: "bottom",
  },
  {
    targetId: "points-display",
    title: "Your Points",
    description:
      "Watch your points grow as you participate in matches and activities.",
    position: "bottom",
  },
  {
    targetId: "profile-button",
    title: "Your Profile",
    description: "View your stats, match history, and achievements.",
    position: "left",
  },
];

const AppTutorial = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    console.log("Tutorial mounted, current step:", currentStep);
    // Check if all target elements exist
    tutorialSteps.forEach((step) => {
      const element = document.getElementById(step.targetId);
      console.log(`Element ${step.targetId} exists:`, !!element);
    });
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep === tutorialSteps.length - 1) {
      localStorage.setItem("tutorialCompleted", "true");
      onComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const step = tutorialSteps[currentStep];

  return (
    <TutorialStep
      {...step}
      onNext={handleNext}
      onPrev={handlePrev}
      isLast={currentStep === tutorialSteps.length - 1}
      isFirst={currentStep === 0}
    />
  );
};

export default AppTutorial;
