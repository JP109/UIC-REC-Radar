import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import ChallengePage from "./pages/ChallengePage";
import OccupancyPage from "./pages/OccupancyPage";
import LeaderboardPage from "./pages/LeaderboardPage";
// import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/challenge" element={<ChallengePage />} />
            <Route path="/occupancy" element={<OccupancyPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
