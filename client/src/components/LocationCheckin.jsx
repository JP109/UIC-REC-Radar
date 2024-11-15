import { useState } from "react";
import { MapPin, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { locationService } from "../services/locationService";

const LocationCheckin = () => {
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckIn = async () => {
    try {
      setIsChecking(true);
      const loadingToast = toast.loading("Verifying your location...");

      const result = await locationService.verifyDailyCheckIn();

      toast.success(`Check-in successful! +${result.pointsEarned} point`, {
        id: loadingToast,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Daily Check-in
      </h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
          <MapPin className="h-4 w-4" />
          <span>Check in at the REC Center</span>
        </div>
        <button
          onClick={handleCheckIn}
          disabled={isChecking}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center space-x-2"
        >
          {isChecking ? (
            <>
              <Loader className="animate-spin h-4 w-4" />
              <span>Checking...</span>
            </>
          ) : (
            <>
              <MapPin className="h-4 w-4" />
              <span>Check In</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LocationCheckin;
