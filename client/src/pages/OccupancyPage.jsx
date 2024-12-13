import { Users } from "lucide-react";
import { useEffect, useState } from "react";

const OccupancyPage = () => {
  const [occupancy, setOccupancy] = useState();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchOccupancy = async () => {
      try {
        const response = await fetch(
          `https://uic-rec-radar.onrender.com/api/users/checkedin`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error fetching occupancy: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("OCCUPANCYYY", data);
        setOccupancy(data.checked_in_count);
      } catch (error) {
        console.error("Error fetching occupancy:", error);
      }
    };

    fetchOccupancy();
  }, []);

  const getOccupancyColor = (occupancy, maxCapacity) => {
    const ratio = occupancy / maxCapacity;
    if (ratio >= 0.8) return "bg-red-500";
    if (ratio >= 0.5) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Live Occupancy
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {"Badmintion court, 1st floor"}
            </h2>
            <div
              className={`px-3 py-1 rounded-full text-white ${getOccupancyColor(
                occupancy,
                16
              )}`}
            >
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>
                  {occupancy}/{16}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getOccupancyColor(occupancy, 16)}`}
              style={{
                width: `${(occupancy / 16) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OccupancyPage;
