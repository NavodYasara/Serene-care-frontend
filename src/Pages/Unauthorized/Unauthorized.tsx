import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from '../../context/AuthContext';

const dashboardMap: Record<string, string> = {
  admin:     "/AdminDashboard",
  caregiver: "/CaregiverDashboard",
  caretaker: "/CaretakerDashboard",
  manager:   "/ManagerDashboard",
};

function Unauthorized() {
  const { userType, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    if (isAuthenticated && userType && dashboardMap[userType]) {
      navigate(dashboardMap[userType]);
    } else {
      navigate("/Login");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        color: "#fff",
        textAlign: "center",
        p: 3,
      }}
    >
      <LockOutlinedIcon sx={{ fontSize: 80, mb: 2, opacity: 0.85 }} />
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Access Denied
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.8, mb: 4, maxWidth: 440 }}>
        You don't have permission to view this page. Please contact your
        administrator if you believe this is a mistake.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={handleBack}
        sx={{
          bgcolor: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.3)",
          color: "#fff",
          px: 5,
          py: 1.5,
          borderRadius: 3,
          fontWeight: "bold",
          "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
        }}
      >
        Go to my Dashboard
      </Button>
    </Box>
  );
}

export default Unauthorized;
