import {
  User,
  Award,
  Calendar,
  TrendingUp,
  Activity,
  Trophy,
} from "lucide-react";

const ProfilePage = () => {
  // Mock user data
  const user = {
    name: "John Doe",
    tier: "gold",
    points: 1200,
    matches: 45,
    wins: 30,
    streak: 5,
    joinDate: "2024-01-15",
  };

  const stats = [
    { label: "Matches", value: user.matches, icon: Calendar },
    {
      label: "Win Rate",
      value: `${Math.round((user.wins / user.matches) * 100)}%`,
      icon: TrendingUp,
    },
    { label: "Current Streak", value: user.streak, icon: Award },
  ];

  // Mock match history data
  const matchHistory = [
    {
      id: 1,
      opponent: "Jane Smith",
      result: "Won",
      date: "2024-03-15",
      points: "+5",
    },
    {
      id: 2,
      opponent: "Mike Johnson",
      result: "Lost",
      date: "2024-03-14",
      points: "-5",
    },
    {
      id: 3,
      opponent: "Sarah Wilson",
      result: "Won",
      date: "2024-03-13",
      points: "+5",
    },
    {
      id: 4,
      opponent: "Tom Brown",
      result: "Won",
      date: "2024-03-12",
      points: "+5",
    },
    {
      id: 5,
      opponent: "Lisa Anderson",
      result: "Lost",
      date: "2024-03-11",
      points: "-5",
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "First Win",
      description: "Won your first match",
      icon: Trophy,
    },
    {
      id: 2,
      title: "5 Win Streak",
      description: "Won 5 matches in a row",
      icon: Activity,
    },
    {
      id: 3,
      title: "Gold Tier",
      description: "Reached Gold Tier",
      icon: Award,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <User className="h-8 w-8 text-blue-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <div className="flex items-center space-x-2">
              <span className="capitalize text-gray-600">{user.tier} tier</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-gray-600">{user.points} points</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center space-x-3">
              <stat.icon className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Match History */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Recent Matches</h2>
        </div>
        <div className="divide-y">
          {matchHistory.map((match) => (
            <div
              key={match.id}
              className="p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium">{match.opponent}</p>
                  <p className="text-sm text-gray-500">{match.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`text-sm font-medium ${
                    match.result === "Won" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {match.result}
                </span>
                <span
                  className={`text-sm font-medium ${
                    match.points.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {match.points}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Achievements</h2>
        </div>
        <div className="divide-y">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="p-4 flex items-center space-x-4 hover:bg-gray-50"
            >
              <div className="p-2 bg-yellow-100 rounded-full">
                <achievement.icon className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium">{achievement.title}</p>
                <p className="text-sm text-gray-500">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
