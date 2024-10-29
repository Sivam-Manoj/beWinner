import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import svg from "/splashScren_icon.svg";

const SplashScreen = () => {
  const [zoom, setZoom] = useState(false);
  const theme = useTheme();


  useEffect(() => {
    const timer = setTimeout(() => {
      setZoom(true);
    }, 100); // Start zoom effect shortly after component mounts

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <div className="flex flex-col items-center space-y-6 p-6 rounded-lg">
        {/* Logo Section */}
        <img
          src={svg}
          alt="App Logo"
          className={`w-[456px] h-[456px] ml-4 mb-4 transition-transform duration-[3000ms] ${
            zoom ? "scale-110" : "scale-100"
          }`}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
