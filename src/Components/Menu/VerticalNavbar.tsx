import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import {
  Home,
  Settings,
  FeedOutlined,
  KeyboardArrowLeftSharp,
  KeyboardArrowRightSharp,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const VerticalNavbar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <Drawer
      variant="permanent"
      className={clsx(
        "transition-all duration-300 ease-in-out shadow-lg",
        isExpanded ? "w-56" : "w-20"
      )}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#393838",
          color: "white",
          overflowX: "hidden",
          width: isExpanded ? "14rem" : "5rem",
          transition: "width 0.3s",
      
        },
      }}
    >
      {/* Expand/Collapse Button */}
      <div className="flex items-end justify-end py-6">
        <IconButton onClick={toggleExpand} className="text-white">
          {isExpanded ? (
            <KeyboardArrowLeftSharp fontSize="large" className="text-white" />
          ) : (
            <KeyboardArrowRightSharp fontSize="large" className="text-white" />
          )}
        </IconButton>
      </div>

      {/* Menu Items */}
      <List>
        <MenuItem
          icon={<Home fontSize="large" />}
          label="Home"
          isExpanded={isExpanded}
          to="/"
        />
        <MenuItem
          icon={<FeedOutlined fontSize="large" />}
          label="Excel Viewer"
          isExpanded={isExpanded}
          to="/excel-viewer"
        />
      </List>

      {/* Bottom Section with Settings */}
      <div className="mt-auto mb-4">
        <MenuItem
          icon={<Settings fontSize="large" />}
          label="Settings"
          isExpanded={isExpanded}
          to="/settings"
        />
      </div>
    </Drawer>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  isExpanded: boolean;
  to: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, isExpanded, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Tooltip title={isExpanded ? "" : label} placement="right">
      <ListItemButton
        component={Link}
        to={to}
        className={clsx(
          "relative rounded-lg transition-all duration-200",
          isExpanded ? "justify-start" : "justify-center",
          isActive ? "text-white" : "text-white hover:bg-gray-700"
        )}
        sx={{
          py: 2,
          px: isExpanded ? 3 : 0,
          minWidth: 0,
          maxWidth: "100%",
          alignItems: "center",
          borderRadius: "8px",
          mx: isExpanded ? 1 : 0,
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)", // Light hover effect
          },
        }}
      >
        <ListItemIcon
          className="min-w-0"
          sx={{
            justifyContent: "center",
            fontSize: "2rem",
            minWidth: "auto",
            marginLeft: isExpanded ? 1 : 2.5,
            color: "#D1D5DB", // Default color for icons
            "&:hover": {
              color: "#FFD700", // Dark yellow color on hover
            },
          }}
        >
          {icon}
        </ListItemIcon>
        {isExpanded && (
          <ListItemText
            primary={label}
            primaryTypographyProps={{
              fontSize: "1.1rem",
              fontWeight: "medium",
            }}
            sx={{
              color: "#D1D5DB", // Default color for text
              ml: 1,
            }}
          />
        )}
        {/* Underline Effect */}
        <span
          className={clsx(
            "absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-300",
            isActive ? "w-1/2 bg-yellow-400" : "w-0"
          )}
          style={{
            height: "3px", // Height of the underline
            borderRadius: "2px", // Rounded corners for the underline
          }}
        />
      </ListItemButton>
    </Tooltip>
  );
};

export default VerticalNavbar;
