import { Users, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

const OccupancyPage = () => {
  const [occupancy, setOccupancy] = useState(0);
  const token = localStorage.getItem("authToken");
  const MAX_CAPACITY = 100;

  useEffect(() => {
    const fetchOccupancy = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/checkedin`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error fetching occupancy: ${response.statusText}`);
        }
        const data = await response.json();
        setOccupancy(data.checked_in_count ?? 0);
      } catch (error) {
        console.error("Error fetching occupancy:", error);
      }
    };

    fetchOccupancy();
  }, []);

  const ratio = occupancy / MAX_CAPACITY;
  const barColor =
    ratio >= 0.8
      ? "bg-uic-red"
      : ratio >= 0.5
        ? "bg-yellow-500"
        : "bg-green-500";
  const badgeColor =
    ratio >= 0.8
      ? "bg-uic-red"
      : ratio >= 0.5
        ? "bg-yellow-500"
        : "bg-green-500";
  const statusLabel =
    ratio >= 0.8 ? "Almost Full" : ratio >= 0.5 ? "Moderate" : "Available";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/app"
          className="flex items-center text-sm text-gray-500 hover:text-uic-navy dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Home
        </Link>
        <h1 className="text-2xl font-bold text-uic-navy dark:text-white pb-2 border-b-2 border-uic-red flex-1">
          Live Occupancy
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold text-uic-navy dark:text-white">
                Student Recreation Facility (East Campus)
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {statusLabel}
              </p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-white text-sm font-medium ${badgeColor}`}
            >
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>
                  {occupancy}/{MAX_CAPACITY}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${barColor}`}
              style={{
                width: `${Math.max(ratio * 100, occupancy > 0 ? 4 : 0)}%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-400">0</span>
            <span className="text-xs text-gray-400">{MAX_CAPACITY}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold text-uic-navy dark:text-white">
                Sport & Fitness Center (West Campus)
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {statusLabel}
              </p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-white text-sm font-medium ${badgeColor}`}
            >
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>
                  {occupancy}/{MAX_CAPACITY}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${barColor}`}
              style={{
                width: `${Math.max(ratio * 100, occupancy > 0 ? 4 : 0)}%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-400">0</span>
            <span className="text-xs text-gray-400">{MAX_CAPACITY}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OccupancyPage;
