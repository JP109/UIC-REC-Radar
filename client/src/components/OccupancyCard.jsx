import { MapPin } from "lucide-react";
import BaseCard from "./BaseCard";

const OccupancyCard = () => {
  return (
    <BaseCard
      to="/occupancy"
      icon={MapPin}
      title="Live Occupancy"
      description="Check court availability"
      bgColor="bg-green-500"
      darkBgColor="dark:bg-green-700"
    />
  );
};

export default OccupancyCard;
