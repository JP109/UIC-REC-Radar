import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import ChallengePage from "./pages/ChallengePage";
import OccupancyPage from "./pages/OccupancyPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/challenge" element={<ChallengePage />} />
              <Route path="/occupancy" element={<OccupancyPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
