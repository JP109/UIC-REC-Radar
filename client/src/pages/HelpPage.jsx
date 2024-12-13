import {
  HelpCircle,
  AlertCircle,
  Info,
  Trophy,
  MapPin,
  Users,
  CheckCircle,
} from "lucide-react";

const HelpPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Help & Instructions
        </h1>

        {/* Getting Started Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <HelpCircle className="mr-2 h-6 w-6 text-blue-500" />
            Getting Started
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Registration Process
            </h3>
            <ol className="list-decimal ml-6 space-y-3">
              <li>Click the "Register" button on the landing page</li>
              <li>Enter your full name and UIC email address</li>
              <li>
                The app will prompt you to create a passkey - this is a secure
                way to log in without passwords:
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>
                    On Windows: You'll use Windows Hello (fingerprint or face
                    recognition)
                  </li>
                  <li>On Mac: You'll use Touch ID or Face ID</li>
                  <li>
                    On mobile: You'll use your device's biometric authentication
                  </li>
                </ul>
              </li>
              <li>
                After creating your passkey, You will get a success message. Go
                to the login page after that to log in.
              </li>
              <li>Complete any initial profile setup if prompted</li>
            </ol>
          </div>
        </section>

        {/* Testing/Admin Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <AlertCircle className="mr-2 h-6 w-6 text-purple-500" />
            For Instructors & Testers
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                Testing Location Features
              </h3>
              <p className="mb-4">
                To test location-dependent features (check-in and match
                results), you can use Chrome's location spoofing:
              </p>

              <ol className="list-decimal ml-6 space-y-3">
                <li>
                  Open Chrome DevTools:
                  <ul className="list-disc ml-6 mt-1">
                    <li>Windows: Press F12 or Ctrl + Shift + I</li>
                    <li>Mac: Press Cmd + Option + I</li>
                  </ul>
                </li>
                <li>
                  Enable location simulation:
                  <ul className="list-disc ml-6 mt-1">
                    <li>Click the three dots menu (...) in DevTools</li>
                    <li>Go to More tools → Sensors</li>
                  </ul>
                </li>
                <li>
                  Set the UIC REC Center location:
                  <ul className="list-disc ml-6 mt-1">
                    <li>In Location dropdown, select "Custom location"</li>
                    <li>
                      Enter these coordinates:
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 mt-1 rounded">
                        Latitude: 41.8707
                        <br />
                        Longitude: -87.6473
                      </div>
                    </li>
                  </ul>
                </li>
                <li>
                  Test the features:
                  <ul className="list-disc ml-6 mt-1">
                    <li>Try daily check-in (earns 1 point)</li>
                    <li>Test match result submission</li>
                    <li>Verify points are awarded correctly</li>
                  </ul>
                </li>
                <li>
                  Alternative testing locations:
                  <ul className="list-disc ml-6 mt-1">
                    <li>
                      Student Recreation Facility entrance:
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 mt-1 rounded">
                        Latitude: 41.8705
                        <br />
                        Longitude: -87.6475
                      </div>
                    </li>
                    <li>
                      Basketball courts area:
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 mt-1 rounded">
                        Latitude: 41.8708
                        <br />
                        Longitude: -87.6472
                      </div>
                    </li>
                  </ul>
                </li>
              </ol>
              <div className="mt-4 bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  Important Testing Notes
                </h4>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Location spoofing must be enabled before accessing the app
                  </li>
                  <li>Keep the DevTools window open during testing</li>
                  <li>
                    If location verification fails, try refreshing the page with
                    DevTools open
                  </li>
                  <li>
                    The app uses a 500-meter radius from the REC Center
                    coordinates for verification
                  </li>
                </ul>
              </div>

              <div className="mt-4 bg-blue-100 dark:bg-blue-900/30 p-3 rounded">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  Verifying Points System
                </h4>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Daily check-in should award 1 point</li>
                  <li>
                    Match results should update points for both winner and loser
                  </li>
                  <li>
                    Points affect tier status:
                    <ul className="list-disc ml-6 mt-1">
                      <li>Bronze: 0-99 points</li>
                      <li>Silver: 100-299 points</li>
                      <li>Gold: 300+ points</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Daily Usage Guide */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Info className="mr-2 h-6 w-6 text-green-500" />
            How to Use Each Feature
          </h2>

          {/* Check-in Feature */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-blue-500" />
              Daily Check-in
            </h3>
            <div className="ml-7 space-y-2 text-gray-600 dark:text-gray-300">
              <p>1. When you arrive at the REC Center:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  Open the app and locate the "Daily Check-in" card on the main
                  dashboard
                </li>
                <li>
                  Click "Check In" - this requires you to be physically at the
                  REC Center
                </li>
                <li>Allow location access when prompted</li>
                <li>Receive your daily check-in points (+1 point)</li>
              </ul>
              <p className="text-sm italic mt-2">
                Note: You can only check in once per day
              </p>
            </div>
          </div>

          {/* Challenge System */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <Users className="mr-2 h-5 w-5 text-purple-500" />
              Challenging Other Players
            </h3>
            <div className="ml-7 space-y-2 text-gray-600 dark:text-gray-300">
              <p>To send a challenge:</p>
              <ol className="list-decimal ml-6 space-y-2">
                <li>Go to the "Challenge" section from the main dashboard</li>
                <li>
                  Browse the list of available players
                  <ul className="list-disc ml-6 mt-1">
                    <li>Use the search bar to find specific players</li>
                    <li>Filter players by tier (Bronze/Silver/Gold)</li>
                  </ul>
                </li>
                <li>Click "Challenge" next to the player you want to face</li>
                <li>Select your preferred date and time for the match</li>
                <li>Click "Send Challenge" to send the request</li>
              </ol>

              <p className="mt-3">To respond to a challenge:</p>
              <ol className="list-decimal ml-6 space-y-2">
                <li>Check the "Active Matches" section on your dashboard</li>
                <li>Review incoming challenge requests</li>
                <li>Accept or decline the challenge</li>
              </ol>

              <p className="mt-3">After the match:</p>
              <ol className="list-decimal ml-6 space-y-2">
                <li>Both players must be at the REC Center</li>
                <li>The winner must submit the match result</li>
                <li>
                  Points will be automatically calculated and distributed:
                  <ul className="list-disc ml-6 mt-1">
                    <li>
                      Winner: +5 to +10 points (based on confidence levels)
                    </li>
                    <li>
                      Loser: -5 to -10 points (based on confidence levels)
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>

          {/* Court Occupancy */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-green-500" />
              Checking Court Occupancy
            </h3>
            <div className="ml-7 space-y-2 text-gray-600 dark:text-gray-300">
              <ol className="list-decimal ml-6 space-y-2">
                <li>Click the "Live Occupancy" card on the dashboard</li>
                <li>
                  View real-time court availability:
                  <ul className="list-disc ml-6 mt-1">
                    <li>Green: Low occupancy (0-50%)</li>
                    <li>Yellow: Medium occupancy (51-79%)</li>
                    <li>Red: High occupancy (80-100%)</li>
                  </ul>
                </li>
                <li>
                  Each court shows current player count and maximum capacity
                </li>
              </ol>
            </div>
          </div>

          {/* Points & Tiers */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
              Points System & Tiers
            </h3>
            <div className="ml-7 space-y-2 text-gray-600 dark:text-gray-300">
              <p>Ways to earn points:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Daily check-in: +1 point</li>
                <li>Winning matches: +5 to +10 points</li>
              </ul>

              <p className="mt-3">Tier System:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  Bronze Tier: 0-49 points
                  <ul className="list-disc ml-6">
                    <li>Starting tier for all new users</li>
                  </ul>
                </li>
                <li>
                  Silver Tier: 50-99 points
                  <ul className="list-disc ml-6">
                    <li>Unlocks ability to challenge higher-ranked players</li>
                  </ul>
                </li>
                <li>
                  Gold Tier: 100+ points
                  <ul className="list-disc ml-6">
                    <li>Elite status with special recognition</li>
                    <li>Listed at the top of the leaderboard</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Troubleshooting Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <AlertCircle className="mr-2 h-6 w-6 text-red-500" />
            Troubleshooting
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Registration/Login Issues
              </h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  If registration fails:
                  <ul className="list-disc ml-6 mt-1">
                    <li>Try using browser's incognito mode</li>
                    <li>Ensure you're using a supported browser</li>
                    <li>Clear your local storage</li>
                    <li>Clear your browser cache and cookies</li>
                  </ul>
                </li>
                <li>
                  If passkey creation fails:
                  <ul className="list-disc ml-6 mt-1">
                    <li>
                      Check that your device supports biometric authentication
                    </li>
                    <li>Ensure you've set up Windows Hello/Touch ID/Face ID</li>
                    <li>Try registering on a different device if needed</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Location Services
              </h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  If check-in fails:
                  <ul className="list-disc ml-6 mt-1">
                    <li>Enable location services in your browser settings</li>
                    <li>Allow location access when prompted</li>
                    <li>Make sure you're physically at the REC Center</li>
                    <li>Try refreshing the page</li>
                  </ul>
                </li>
                <li>
                  If location is inaccurate:
                  <ul className="list-disc ml-6 mt-1">
                    <li>Enable high-accuracy mode in your device settings</li>
                    <li>Move to an area with better GPS signal</li>
                    <li>Wait a few seconds and try again</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpPage;
