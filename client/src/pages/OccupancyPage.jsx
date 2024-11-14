import { Users } from "lucide-react";

const OccupancyPage = () => {
  //Mock Data
  const courts = [
    { id: 1, name: "Court 1", occupancy: 4, maxCapacity: 6 },
    { id: 2, name: "Court 2", occupancy: 2, maxCapacity: 6 },
    { id: 3, name: "Court 3", occupancy: 6, maxCapacity: 6 },
    { id: 4, name: "Court 4", occupancy: 0, maxCapacity: 6 },
  ];

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courts.map((court) => (
          <div
            key={court.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {court.name}
              </h2>
              <div
                className={`px-3 py-1 rounded-full text-white ${getOccupancyColor(
                  court.occupancy,
                  court.maxCapacity
                )}`}
              >
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>
                    {court.occupancy}/{court.maxCapacity}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getOccupancyColor(
                  court.occupancy,
                  court.maxCapacity
                )}`}
                style={{
                  width: `${(court.occupancy / court.maxCapacity) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OccupancyPage;
