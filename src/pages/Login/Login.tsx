import React, { useState } from "react";
import {
  Container,
  Card,
  TextField,
  Button,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, userType, loading } = useAuth();

  // Already logged in → skip the login page entirely
  if (!loading && isAuthenticated) {
    const dashboardMap: Record<string, string> = {
      admin: "/AdminDashboard",
      caregiver: "/CaregiverDashboard",
      caretaker: "/CaretakerDashboard",
      manager: "/ManagerDashboard",
    };
    return <Navigate to={(userType && dashboardMap[userType]) || "/"} replace />;
  }

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.post("/api/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { userType, userProfile, token } = response.data;

        // Persist auth state via context (also writes to localStorage)
        login(userProfile, userType, token);

        switch (userType) {
          case "caretaker":
            navigate("/CaretakerDashboard");
            break;
          case "caregiver":
            navigate("/CaregiverDashboard");
            break;
          case "manager":
            navigate("/ManagerDashboard");
            break;
          case "admin":
            navigate("/AdminDashboard");
            break;
          default:
            setError("Invalid user type.");
            setOpenSnackbar(true);
            break;
        }
      } else {
        setError("Invalid login credentials.");
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while logging in.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <div>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 8,
          }}
        >
          <Card sx={{ p: 3, mt: 5, width: "100%" }}>
            <Box textAlign="center" mb={4}>
              <h3>Login</h3>
            </Box>
            <form onSubmit={handleLogin}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="email"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                label="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </form>
          </Card>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        </Container>
      </div>
    </>
  );
}

export default Login;
