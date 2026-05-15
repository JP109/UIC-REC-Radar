import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
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

function AppInner() {
  const location = useLocation();
  const hideNav = location.pathname === "/" || location.pathname === "/auth";

  return (
    <div className="min-h-screen bg-uic-expo-white dark:bg-gray-900 transition-colors duration-200">
      {!hideNav && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        {/* Protected routes */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 text-gray-900 dark:text-gray-100">
                <MainPage />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/challenge"
          element={
            <ProtectedRoute>
              <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 text-gray-900 dark:text-gray-100">
                <ChallengePage />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/occupancy"
          element={
            <ProtectedRoute>
              <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 text-gray-900 dark:text-gray-100">
                <OccupancyPage />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 text-gray-900 dark:text-gray-100">
                <LeaderboardPage />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 text-gray-900 dark:text-gray-100">
                <ProfilePage />
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastProvider />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <PointsProvider>
        <Router>
          <AppInner />
        </Router>
      </PointsProvider>
    </ThemeProvider>
  );
}

export default App;
