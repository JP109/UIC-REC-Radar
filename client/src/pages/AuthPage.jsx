import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { API_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const isLocalDev = API_BASE_URL.includes("localhost");

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [devEmail, setDevEmail] = useState("");
  const [devLoading, setDevLoading] = useState(false);
  const navigate = useNavigate();

  const handleDevLogin = async (e) => {
    e.preventDefault();
    if (!devEmail) return;
    setDevLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/dev-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: devEmail }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Dev login failed");
        return;
      }
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("authToken", data.token);
      toast.success("Dev login successful");
      navigate("/app");
    } catch {
      toast.error("Dev login failed");
    } finally {
      setDevLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-uic-expo-white dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {isLogin ? <LoginForm /> : <RegisterForm />}

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-uic-navy dark:text-blue-400 hover:underline text-sm"
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Sign in"}
          </button>
        </div>

        {isLocalDev && (
          <div className="border border-dashed border-yellow-400 rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20">
            <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 uppercase tracking-wide mb-2">
              Dev Mode — Skip Passkey
            </p>
            <form onSubmit={handleDevLogin} className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={devEmail}
                onChange={(e) => setDevEmail(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-yellow-300 rounded-md bg-white dark:bg-gray-800 dark:text-white focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled={devLoading}
                className="px-3 py-2 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-md font-medium disabled:opacity-50 transition-colors"
              >
                {devLoading ? "..." : "Go"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
