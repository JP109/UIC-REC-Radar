import { useState } from "react";
import { Loader, Key, Mail } from "lucide-react";

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authMethod, setAuthMethod] = useState(null); // 'passkey' or 'traditional'

  const handlePasskeyRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userId = `${name.toLowerCase().replace(/\s/g, "-")}-${Math.random()
        .toString(36)
        .slice(2)}`;

      const publicKeyCredentialCreationOptions = {
        challenge: new Uint8Array(32),
        rp: {
          name: "UIC REC RADAR",
          id: window.location.hostname,
        },
        user: {
          id: Uint8Array.from(userId, (c) => c.charCodeAt(0)),
          name: email,
          displayName: name,
        },
        pubKeyCredParams: [{ alg: -7, type: "public-key" }],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          requireResidentKey: true,
          userVerification: "required",
        },
      };

      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      });

      console.log("Created credential:", credential);
    } catch (err) {
      setError(err.message || "Failed to create passkey. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTraditionalRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Traditional registration:", { name, email, password });
    } catch (err) {
      setError(err.message || "Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!authMethod) {
    return (
      <div className="max-w-md w-full space-y-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Create Account
          </h2>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
            Choose how you want to register
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setAuthMethod("passkey")}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Key className="h-5 w-5" />
            Register with Passkey
          </button>

          <button
            onClick={() => setAuthMethod("traditional")}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Mail className="h-5 w-5" />
            Register with Email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full space-y-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Create Account
        </h2>
        <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
          {authMethod === "passkey"
            ? "Register with passkey"
            : "Register with email"}
        </p>
      </div>

      <form
        className="mt-8 space-y-6"
        onSubmit={
          authMethod === "passkey"
            ? handlePasskeyRegister
            : handleTraditionalRegister
        }
      >
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

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

          {authMethod === "traditional" && (
            <>
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
                {authMethod === "passkey"
                  ? "Creating Passkey..."
                  : "Creating Account..."}
              </>
            ) : authMethod === "passkey" ? (
              "Register with Passkey"
            ) : (
              "Create Account"
            )}
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setAuthMethod(null)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Use a different registration method
          </button>
        </div>
      </form>
    </div>
  );
};
