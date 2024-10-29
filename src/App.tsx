// src/App.tsx
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./Layout/RootLayout"; // Import RootLayout
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./Pages/Error/ErrorPage";
import Home from "./Pages/Home/Home";
import Settings from "./Pages/Settings/Settings";
import SplashScreen from "./Utils/SplashScreen/SplashScreen";
import ExcelViewer from "./Pages/ExcelViewer/ExcelViewer";
import { useTranslation } from "react-i18next";

// Define the router configuration with RootLayout
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />, // RootLayout wraps all routes
    children: [
      { index: true, element: <Home /> },
      { path: "excel-viewer", element: <ExcelViewer /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

const App = () => {
  const [loading, setLoading] = useState(true); // Manage loading state for splash screen
  const { i18n } = useTranslation();

  // Disable right-click context menu
  useEffect(() => {
    const handleContextMenu = (e: Event) => {
      e.preventDefault(); // Prevent the default context menu from opening
    };

    window.addEventListener("contextmenu", handleContextMenu);
    return () => window.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  // Initial language change
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "en"; // Default to English
    i18n.changeLanguage(storedLanguage);

    // Simulate a loading process (e.g., fetch data, initialize app)
    const splashTimeout = setTimeout(() => {
      setLoading(false); // Hide splash screen after 3 seconds
    }, 3000);

    return () => clearTimeout(splashTimeout);
  }, [i18n]);

  // If loading is true, show SplashScreen; otherwise show the app's main content
  return (
    <>
      {loading ? (
        <SplashScreen /> // Show the splash screen during loading
      ) : (
        <>
          <RouterProvider router={router} />
          <ToastContainer
            position="bottom-right" // Position the toast in the bottom right corner
            autoClose={2000} // Automatically close after 2 seconds
            hideProgressBar={false} // Show progress bar
            newestOnTop={false} // Newest toast on top
          />
        </>
      )}
    </>
  );
};

export default App;
