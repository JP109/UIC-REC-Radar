import { useEffect, useState } from "react";
import { Loader, Key, Mail, EyeOff, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import PasswordRequirements from "./PasswordRequirements";
import { validatePassword } from "../utils/passwordValidation";

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authMethod, setAuthMethod] = useState(null); // 'passkey' or 'traditional'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (password) {
      setPasswordRequirements(validatePassword(password));
    }
  }, [password]);

  const validateForm = () => {
    // Check if all password requirements are met
    const allRequirementsMet = passwordRequirements.every((req) => req.valid);

    if (!allRequirementsMet) {
      setError("Please meet all password requirements");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

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

      // Extract credential details
      const { id, rawId, response } = credential;
      const { attestationObject } = response;

      const passkeyData = {
        credential_id: id, // Unique credential ID
        public_key: btoa(
          String.fromCharCode(...new Uint8Array(attestationObject))
        ), // Base64 encode public key
        authenticator_attachment: "platform",
      };

      // Send user details to the backend
      const res = await fetch("https://uic-rec-radar.onrender.com/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          passkey: passkeyData,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create user");
      }

      const data = await res.json();
      console.log("User created:", data);

      // // Immediately log in the user
      // const assertion = await navigator.credentials.get({
      //   publicKey: {
      //     challenge: new Uint8Array(32), // Server-generated challenge
      //     allowCredentials: [
      //       {
      //         id: Uint8Array.from(window.atob(passkeyData.credential_id), (c) =>
      //           c.charCodeAt(0)
      //         ),
      //         type: "public-key",
      //       },
      //     ],
      //     userVerification: "required",
      //   },
      // });

      // console.log("Authenticated:", assertion);

      // // Send assertion to the backend for verification
      // const loginRes = await fetch(
      //   "https://uic-rec-radar.onrender.com/api/auth/login",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ assertion, email }),
      //   }
      // );

      // if (!loginRes.ok) {
      //   throw new Error("Failed to log in");
      // }

      // const loginData = await loginRes.json();
      // console.log("Login successful:", loginData);

      // localStorage.setItem("jwt", loginData.token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("tutorialCompleted", "false");
      localStorage.setItem("justRegistered", "true");
      toast.success("Account created successfully");
      navigate("/app");
    } catch (err) {
      setError(err.message || "Failed to create passkey. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTraditionalRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      console.log("Traditional registration:", { name, email, password });
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("tutorialCompleted", "false");
      localStorage.setItem("justRegistered", "true");
      toast.success("Account created successfully");
      navigate("/app");
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
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <PasswordRequirements requirements={passwordRequirements} />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
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
