import { useState } from "react";
import { MapPin, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { locationService } from "../services/locationService";
import { API_BASE_URL } from "../config";
import { usePoints } from "../context/PointsContext";

const LocationCheckin = () => {
  const [isChecking, setIsChecking] = useState(false);
  const token = localStorage.getItem("authToken");
  const { points, updatePoints } = usePoints();

  const handleCheckIn = async () => {
    try {
      setIsChecking(true);
      const loadingToast = toast.loading("Verifying your location...");

      const result = await locationService.verifyDailyCheckIn();
      await fetch(`${API_BASE_URL}/api/users/points`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ points: 1 }),
      });
      updatePoints((points ?? 0) + 1);
      toast.success(`Check-in successful! +1 point`, {
        id: loadingToast,
      });
      fetch(`${API_BASE_URL}/api/users/checkedin`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ checked_in_value: true }),
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <section id="daily-checkin" aria-labelledby="checkin-heading">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-l-4 border-uic-navy">
        <h3
          id="checkin-heading"
          className="text-lg font-semibold text-uic-navy dark:text-white mb-4"
        >
          Daily Check-in
        </h3>
        <div className="flex items-center justify-between">
          <div
            className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300"
            aria-hidden="true"
          >
            <MapPin className="h-4 w-4 text-uic-navy dark:text-gray-400" />
            <span>Check in at the REC Center</span>
          </div>
          <button
            onClick={handleCheckIn}
            disabled={isChecking}
            aria-busy={isChecking}
            aria-label={isChecking ? "Verifying location, please wait" : "Check in at the REC Center to earn a point"}
            className="px-4 py-2 bg-uic-red text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center space-x-2 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uic-red"
          >
            {isChecking ? (
              <>
                <Loader className="animate-spin h-4 w-4" aria-hidden="true" />
                <span>Checking...</span>
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>Check In</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default LocationCheckin;
