import { useState } from "react";
import { Loader, Key, Mail } from "lucide-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMethod, setAuthMethod] = useState(null); // 'passkey' or 'traditional'

  const navigate = useNavigate();

  const handlePasskeyLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const publicKeyCredentialRequestOptions = {
        challenge: new Uint8Array(32),
        rpId: window.location.hostname,
        userVerification: "required",
        timeout: 60000,
      };

      const credential = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      });

      console.log("Retrieved credential:", credential);
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Logged in successfully");
      navigate("/app");
    } catch (err) {
      setError(err.message || "Failed to authenticate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTraditionalLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Traditional login:", { email, password });
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Logged in successfully");
      navigate("/app");
    } catch (err) {
      setError(err.message || "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!authMethod) {
    return (
      <div className="max-w-md w-full space-y-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
            Choose how you want to sign in
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setAuthMethod("passkey")}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Key className="h-5 w-5" />
            Continue with Passkey
          </button>

          <button
            onClick={() => setAuthMethod("traditional")}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Mail className="h-5 w-5" />
            Continue with Email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full space-y-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
          {authMethod === "passkey"
            ? "Sign in with your passkey"
            : "Sign in with your email"}
        </p>
      </div>

      <form
        className="mt-8 space-y-6"
        onSubmit={
          authMethod === "passkey" ? handlePasskeyLogin : handleTraditionalLogin
        }
      >
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {authMethod === "traditional" && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Authenticating...
              </>
            ) : authMethod === "passkey" ? (
              "Sign in with Passkey"
            ) : (
              "Sign in"
            )}
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setAuthMethod(null)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Use a different sign-in method
          </button>
        </div>
      </form>
    </div>
  );
};
