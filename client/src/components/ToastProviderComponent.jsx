import { Toaster } from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

const ToastProvider = () => {
  const { darkMode } = useTheme();

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: darkMode ? "#ffffff" : "#000000",
          color: darkMode ? "#000000" : "#ffffff",
          border: `1px solid ${
            darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
          }`,
        },
        success: {
          style: {
            background: darkMode ? "#ffffff" : "#000000",
            color: darkMode ? "#000000" : "#ffffff",
          },
          iconTheme: {
            primary: "#10B981",
            secondary: darkMode ? "#ffffff" : "#000000",
          },
        },
        error: {
          style: {
            background: darkMode ? "#ffffff" : "#000000",
            color: darkMode ? "#000000" : "#ffffff",
          },
          iconTheme: {
            primary: "#EF4444",
            secondary: darkMode ? "#ffffff" : "#000000",
          },
          duration: 4000,
        },
        loading: {
          style: {
            background: darkMode ? "#ffffff" : "#000000",
            color: darkMode ? "#000000" : "#ffffff",
          },
        },
      }}
    />
  );
};

export default ToastProvider;
