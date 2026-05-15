import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { User, Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { usePoints } from "../context/PointsContext";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config";

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { points, updatePoints } = usePoints();
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    if (isAuthenticated) {
      const fetchPoints = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/users/points`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!response.ok) return;
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
    fetch(`${API_BASE_URL}/api/users/checkedin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ checked_in_value: false }),
    });
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-uic-navy shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link
            to={isAuthenticated ? "/app" : "/"}
            id="navbar-logo"
            className="text-base sm:text-xl font-bold tracking-wide flex-shrink-0"
          >
            <span className="text-white">UIC REC </span>
            <span className="text-uic-red">RADAR</span>
          </Link>

          {/* Right side */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Points — hide label on mobile */}
            {isAuthenticated && (
              <div
                id="points-display"
                className="text-white/90 text-xs sm:text-sm font-medium bg-white/10 px-2 sm:px-3 py-1 rounded-full"
              >
                <span className="hidden sm:inline">{points} pts</span>
                <span className="sm:hidden">{points}pt</span>
              </div>
            )}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-white/80" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-white/80" />
              )}
            </button>

            {/* Profile + Logout — authenticated only */}
            {isAuthenticated && (
              <>
                <Link
                  to="/profile"
                  id="profile-button"
                  className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 min-w-[36px] min-h-[36px] flex items-center justify-center"
                  aria-label="Profile"
                >
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-white/80" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 text-white/80 min-w-[36px] min-h-[36px] flex items-center justify-center"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
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
