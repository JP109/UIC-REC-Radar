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
      />
    </div>
  );
};

export default OccupancyCard;
