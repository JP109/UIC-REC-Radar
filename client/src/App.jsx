import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import ChallengePage from "./pages/ChallengePage";
import OccupancyPage from "./pages/OccupancyPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
import { PointsProvider } from "./context/PointsContext";
import ToastProvider from "./components/ToastProviderComponent";

function App() {
  return (
    <ThemeProvider>
      <PointsProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />

              {/* Protected routes */}
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <div>
                      <Navbar />
                      <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
                        <MainPage />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/challenge"
                element={
                  <ProtectedRoute>
                    <div>
                      <Navbar />
                      <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
                        <ChallengePage />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/occupancy"
                element={
                  <ProtectedRoute>
                    <div>
                      <Navbar />
                      <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
                        <OccupancyPage />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/leaderboard"
                element={
                  <ProtectedRoute>
                    <div>
                      <Navbar />
                      <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
                        <LeaderboardPage />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <div>
                      <Navbar />
                      <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
                        <ProfilePage />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />

              {/* Catch all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <ToastProvider />
          </div>
        </Router>
      </PointsProvider>
    </ThemeProvider>
  );
}

export default App;
