import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  UserPlus,
  LogIn,
  Activity,
  Users,
  Trophy,
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              UIC REC RADAR
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Connect with fellow athletes, track your progress, and compete in
              matches at the UIC Recreation Center.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => navigate("/auth")}
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Get started
                <ArrowRight className="ml-2 h-4 w-4 inline" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to enhance your recreation experience
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-blue-500/10 p-2 ring-1 ring-blue-500/20">
                  <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900 dark:text-white">
                  Real-time Occupancy
                </dt>
                <dd className="mt-2 leading-7 text-gray-600 dark:text-gray-400">
                  Check court availability and occupancy in real-time before
                  heading to the rec center.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-blue-500/10 p-2 ring-1 ring-blue-500/20">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900 dark:text-white">
                  Challenge Players
                </dt>
                <dd className="mt-2 leading-7 text-gray-600 dark:text-gray-400">
                  Find and challenge other players to matches, track your games,
                  and improve your skills.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-blue-500/10 p-2 ring-1 ring-blue-500/20">
                  <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900 dark:text-white">
                  Leaderboard System
                </dt>
                <dd className="mt-2 leading-7 text-gray-600 dark:text-gray-400">
                  Compete for top positions on the leaderboard and earn points
                  through matches and activities.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 dark:bg-blue-700">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Join our community of athletes and take your recreation experience
              to the next level.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={() => navigate("/auth")}
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white flex items-center"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </button>
              <button
                onClick={() => navigate("/auth")}
                className="rounded-md border border-white px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white flex items-center"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
