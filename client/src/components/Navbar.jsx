import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { User, Sun, Moon, LogOut, HelpCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { usePoints } from "../context/PointsContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { points, updatePoints } = usePoints();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("authToken");
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const isPublicPage = ["/", "/auth", "/help"].includes(location.pathname);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchPoints = async () => {
        try {
          const response = await fetch(
            `https://uic-rec-radar.onrender.com/api/users/points`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error(`Error fetching points: ${response.statusText}`);
          }
          const data = await response.json();
          updatePoints(data.points);
        } catch (error) {
          console.error("Error fetching points:", error);
        }
      };
      fetchPoints();
    }
  }, [updatePoints, isAuthenticated]);

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to={isAuthenticated ? "/app" : "/"}
            id="navbar-logo"
            className="text-xl font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200"
          >
            UIC REC RADAR
          </Link>

          <div className="flex items-center space-x-4">
            {/* Help link - always visible */}
            <Link
              to="/help"
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <span>How To Use</span>
              <HelpCircle className="h-5 w-5 ml-1" />
            </Link>

            {/* Only show points for authenticated users */}
            {isAuthenticated && (
              <div id="points-display" className="pr-2">
                Points: {points}
              </div>
            )}

            {/* Theme toggle - always visible */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Profile and Logout - only for authenticated users */}
            {isAuthenticated && (
              <>
                <Link
                  to="/profile"
                  id="profile-button"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Profile"
                >
                  <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-600 dark:text-gray-300"
                  aria-label="Logout"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
