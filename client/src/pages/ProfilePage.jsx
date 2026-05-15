import {
  User,
  Award,
  Calendar,
  TrendingUp,
  Trophy,
  Star,
  ArrowLeft,
} from "lucide-react";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config";

const ProfilePage = () => {
  const token = localStorage.getItem("authToken");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/users/user`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error fetching user: ${response.statusText}`);
        }
        const data = await response.json();
        setCurrentUser(data);
      } catch (err) {
        toast.error(err.message);
      }
    };
    fetchCurrentUser();
  }, []);

  const stats = [
    { label: "Points", value: currentUser?.points ?? "—", icon: Star },
    { label: "Tier", value: currentUser?.tier ? `${currentUser.tier.charAt(0).toUpperCase()}${currentUser.tier.slice(1)}` : "—", icon: TrendingUp },
    { label: "Check-ins", value: currentUser?.checked_in ? "Active" : "—", icon: Calendar },
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
      icon: Award,
    },
    {
      id: 3,
      title: "Gold Tier",
      description: "Reached Gold Tier",
      icon: Star,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/app" className="inline-flex items-center text-xs text-gray-500 hover:text-uic-navy dark:hover:text-white transition-colors">
        <ArrowLeft className="h-3 w-3 mr-1" /> Home
      </Link>

      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 border-t-4 border-uic-red transition-colors duration-200">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-uic-navy/10 dark:bg-uic-navy/30 rounded-full">
            <User className="h-8 w-8 text-uic-navy dark:text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-uic-navy dark:text-white">
              {currentUser?.name ?? "Loading..."}
            </h1>
            <div className="flex items-center space-x-2 mt-1">
              <span className="capitalize text-gray-600 dark:text-gray-300 text-sm">
                {currentUser?.tier} Tier
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                {currentUser?.points} points
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <stat.icon className="h-5 w-5 text-uic-navy dark:text-white" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className="text-xl font-bold text-uic-navy dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-uic-navy dark:text-white">
            Achievements
          </h2>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="p-4 flex items-center space-x-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-full">
                <achievement.icon className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="font-medium text-uic-navy dark:text-white">
                  {achievement.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
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
