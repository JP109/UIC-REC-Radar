import { MapPin } from "lucide-react";
import BaseCard from "./BaseCard";

const OccupancyCard = () => {
  return (
    <div id="occupancy-card">
      <BaseCard
        to="/occupancy"
        icon={MapPin}
        title="Live Occupancy"
        description="Check court availability"
        bgColor="bg-green-500"
        darkBgColor="dark:bg-green-700"
      />
    </div>
  );
};

export default OccupancyCard;
