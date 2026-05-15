import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  UserPlus,
  LogIn,
  Activity,
  Users,
  Trophy,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Find your competition.",
    description:
      "Challenge other UIC athletes, schedule matches, and track every result.",
  },
  {
    icon: Activity,
    title: "Know court availability.",
    description:
      "Check live occupancy before you head over. No wasted trip, just game time.",
  },
  {
    icon: Trophy,
    title: "Make your ranking known.",
    description:
      "Earn points, climb the leaderboard, and compete for the top spot.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero — navy full-bleed, full viewport height */}
      <div className="bg-uic-navy overflow-hidden relative min-h-screen flex flex-col justify-center">
        {/* Faint background arc — UIC echo pattern texture */}
        <div
          className="absolute top-1/2 -translate-y-1/2 rounded-full border-[40px] border-white opacity-[0.03] pointer-events-none"
          style={{ right: "-500px", width: "1000px", height: "1000px" }}
        />

        {/* Text content */}
        <div className="relative z-10 px-8 sm:px-14 lg:px-24 py-20 max-w-2xl">
          {/* <span className="inline-block mb-4 text-xs font-bold tracking-widest uppercase text-uic-red font-sans">
            UIC Recreation Center
          </span> */}
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight text-white leading-none">
            UIC REC
            <br />
            <span className="text-uic-red">RADAR</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/60 font-sans max-w-md leading-relaxed">
            Connect with athletes, check court availability, and compete at the
            UIC Recreation Center.
          </p>
          <div className="mt-7 flex items-center gap-3 flex-wrap">
            <button
              onClick={() => navigate("/auth")}
              className="inline-flex items-center rounded-md bg-uic-red px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-uic-brick transition-colors duration-200 font-sans"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="inline-flex items-center rounded-md border border-white/60 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors duration-200 font-sans"
            >
              Sign In
            </button>
          </div>

          {/* Stats */}
          <div className="mt-14 flex items-center gap-8 sm:gap-12">
            <div>
              <p className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-white">
                Challenge
              </p>
              <p className="text-xs text-white/40 uppercase tracking-widest font-sans mt-1">
                your friends
              </p>
            </div>
            <div className="w-px h-12 bg-white/20" />

            <div>
              <p className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-white">
                Live
              </p>
              <p className="text-xs text-white/40 uppercase tracking-widest font-sans mt-1">
                Occupancy Check
              </p>
            </div>

            <div className="w-px h-12 bg-white/20" />
            <div>
              <p className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-uic-red">
                UIC
              </p>
              <p className="text-xs text-white/40 uppercase tracking-widest font-sans mt-1">
                Only
              </p>
            </div>
          </div>
        </div>

        {/* Photo — more than half visible, cropped vertically by parent overflow-hidden */}
        <div
          className="absolute top-1/2 -translate-y-1/2 rounded-full overflow-hidden shadow-2xl hidden sm:block"
          style={{ right: "-180px", width: "900px", height: "900px" }}
        >
          <img
            src="/hero.jpg"
            alt="Students playing pickup basketball at the UIC Recreation Center"
            className="w-full h-full object-cover brightness-90"
            style={{ objectPosition: "center 60%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-uic-navy/40 via-uic-navy/10 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Red divider */}
      <div className="h-1 bg-uic-red" />

      {/* Features */}
      <div className="py-10 sm:py-12 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-center text-xs font-bold tracking-widest uppercase text-uic-red mb-2 font-sans">
            What You Can Do
          </p>
          <h2 className="text-center font-display text-2xl sm:text-3xl font-bold uppercase text-uic-navy dark:text-white mb-7 sm:mb-9 tracking-tight">
            Everything you need to own the court
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-uic-expo-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-uic-navy flex-shrink-0">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold uppercase text-uic-navy dark:text-white tracking-tight">
                    {title}
                  </h3>
                </div>
                <p className="text-sm text-uic-steel dark:text-gray-400 leading-relaxed font-sans">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA — red dominant per brand guidelines */}
      <div className="bg-uic-red">
        <div className="mx-auto max-w-3xl px-6 py-10 sm:py-12 text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-white mb-3 tracking-tight">
            Make your game known.
          </h2>
          <p className="text-white/80 mb-7 text-sm sm:text-base font-sans">
            Join the UIC REC community. Your competition is already here.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => navigate("/auth")}
              className="inline-flex items-center rounded-md bg-uic-navy px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white hover:bg-uic-navy-dark transition-colors duration-200 font-sans"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Sign Up
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="inline-flex items-center rounded-md bg-white/10 border border-white/60 px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors duration-200 font-sans"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
