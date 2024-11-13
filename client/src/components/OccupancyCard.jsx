import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const OccupancyCard = () => {
  return (
    <Link
      to="/occupancy"
      className="transform transition-all duration-200 hover:scale-105"
    >
      <div className="bg-green-500 rounded-lg shadow-lg p-6 text-white">
        <div className="flex flex-col items-center text-center space-y-4">
          <MapPin className="h-8 w-8" />
          <h2 className="text-2xl font-bold">Live Occupancy</h2>
          <p className="text-sm opacity-90">Check court availability</p>
        </div>
      </div>
    </Link>
  );
};

export default OccupancyCard;
