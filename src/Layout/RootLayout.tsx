import { Outlet } from "react-router-dom";
import VerticalNavbar from "../Components/Menu/VerticalNavbar";

const RootLayout = () => {
  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <VerticalNavbar />

      {/* Main Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
