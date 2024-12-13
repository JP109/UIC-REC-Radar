const REC_CENTER_LOCATION = {
  lat: 41.8707, // UIC REC center coordinates
  lng: -87.6473,
};

const PROXIMITY_THRESHOLD = 500; // meters

export const locationService = {
  // Get user's current location
  getCurrentLocation: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  },

  // Calculate distance between two points in meters
  calculateDistance: (point1, point2) => {
    // Convert latitude and longitude to radians
    const lat1 = point1.lat * (Math.PI / 180);
    const lat2 = point2.lat * (Math.PI / 180);
    const lon1 = point1.lng * (Math.PI / 180);
    const lon2 = point2.lng * (Math.PI / 180);

    // Radius of the Earth in meters
    const R = 6371000;

    // Simple spherical distance formula
    const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    const y = lat2 - lat1;
    const d = Math.sqrt(x * x + y * y) * R;

    return Math.round(d); // Return rounded distance in meters
  },

  // Check if user is within REC center proximity
  isNearRECCenter: async () => {
    try {
      const userLocation = await locationService.getCurrentLocation();
      const distance = locationService.calculateDistance(
        userLocation,
        REC_CENTER_LOCATION
      );
      const isNear = distance <= PROXIMITY_THRESHOLD;

      console.log(`Distance to REC: ${distance}m, Within range: ${isNear}`);
      return isNear;
    } catch (error) {
      console.error("Location verification failed:", error);
      throw new Error("Failed to verify location");
    }
  },

  // Mock check-in verification
  verifyDailyCheckIn: async (userId) => {
    try {
      const isNearREC = await locationService.isNearRECCenter();

      if (!isNearREC) {
        throw new Error("You must be at the REC center to check in");
      }

      return {
        success: true,
        pointsEarned: 1,
        message: "Daily check-in successful!",
      };
    } catch (error) {
      throw error;
    }
  },
};

export default locationService;
