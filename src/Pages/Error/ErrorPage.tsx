import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { Home } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <Box
      className="flex flex-col items-center justify-center h-screen text-center animate-fadeIn"
      sx={{ backgroundColor: "#f8f9fa", color: "#333" }}
    >
      {/* Error Icon with Animation */}
      <Box
        className="animate-bounce"
        sx={{
          fontSize: "5rem",
          color: "#d32f2f",
          mb: 2,
        }}
      >
        &#9888;
      </Box>

      {/* Error Message */}
      <Typography variant="h4" sx={{ mb: 1 }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        The page you are looking for doesn’t exist or an error occurred.
      </Typography>

      {/* Go Back Button */}
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        startIcon={<Home />}
        sx={{
          textTransform: "none",
          fontSize: "1rem",
          backgroundColor: "#5173c3",
          "&:hover": {
            backgroundColor: "#3d5a99",
          },
        }}
      >
        Go Back to Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
