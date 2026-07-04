import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Box,
  Typography,
  Avatar,
  Divider,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Stack,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import WcIcon from "@mui/icons-material/Wc";

const ServiceRequests = () => {
  const user = JSON.parse(localStorage.getItem("userProfile") || "{}") || {};
  const theme = useTheme();

  const [requestData, setRequestData] = useState({
    requirement: "",
    preffGender: "",
    startDate: "",
    endDate: "",
    caretakerId: "",
  });

  const [caretakers, setCaretakers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "info" | "warning" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setRequestData({ ...requestData, [name]: value });
  };

  const handleSelectCaretaker = (e: any) => {
    setRequestData({ ...requestData, caretakerId: e.target.value });
  };

  const handleRequestSubmit = async () => {
    if (
      !requestData.requirement ||
      !requestData.startDate ||
      !requestData.endDate
    ) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        severity: "warning",
      });
      return;
    }

    setLoading(true);
    const submissionData = {
      ...requestData,
      userId: user.userId,
      status: "pending",
    };

    try {
      await axios.post(
        "http://localhost:5000/api/requirement/insertRequest",
        submissionData,
      );

      setSnackbar({
        open: true,
        message: "Service request submitted successfully!",
        severity: "success",
      });
      setRequestData({
        requirement: "",
        preffGender: "",
        startDate: "",
        endDate: "",
        caretakerId: "",
      });

      // Optional: Refresh list or redirect
    } catch (error) {
      console.error("Error saving requirements:", error);
      setSnackbar({
        open: true,
        message: "Failed to submit request. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCaretakers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/requirement/getAllcaretakers",
        );
        const allCaretakers = response.data;
        const filteredCaretakers = allCaretakers.filter(
          (caretaker: any) => caretaker.userId === user.userId,
        );
        setCaretakers(filteredCaretakers);
      } catch (error) {
        console.error("Error fetching caretakers:", error);
      }
    };

    if (user.userId) {
      fetchCaretakers();
    }
  }, [user.userId]);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
      <Container maxWidth="md">
          {/* Header Section */}
          <Box
            sx={{
              mb: 4,
              p: 4,
              borderRadius: 4,
              background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
              color: "white",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Service Requests
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8 }}>
                Tell us what you need. Submit a new care requirement to find the
                best caregiver for you.
              </Typography>
            </Box>
            <AssignmentIcon
              sx={{
                position: "absolute",
                right: -20,
                bottom: -20,
                fontSize: 150,
                opacity: 0.1,
                color: "white",
              }}
            />
          </Box>

          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
              overflow: "visible",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={4}>
                {/* Section 1: Requirement Details */}
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <AssignmentIcon color="primary" /> Request Details
                  </Typography>
                  <TextField
                    fullWidth
                    label="What services do you require?"
                    placeholder="e.g., Daily assistance with medication and physiotherapy..."
                    multiline
                    rows={4}
                    name="requirement"
                    value={requestData.requirement}
                    onChange={handleInputChange}
                    variant="outlined"
                    sx={{ bgcolor: "#F9FAFB", borderRadius: 2 }}
                  />
                </Box>

                <Divider />

                {/* Section 2: Preferences */}
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <PeopleIcon color="primary" /> Preferences & Selection
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Preferred Caregiver Gender</InputLabel>
                        <Select
                          name="preffGender"
                          value={requestData.preffGender}
                          onChange={handleInputChange}
                          label="Preferred Caregiver Gender"
                          startAdornment={
                            <WcIcon sx={{ mr: 1, color: "text.secondary" }} />
                          }
                        >
                          <MenuItem value="">Any</MenuItem>
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>

                <Divider />

                {/* Section 3: Schedule */}
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <EventIcon color="primary" /> Service Schedule & Duration
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        type="date"
                        label="Start Date"
                        name="startDate"
                        value={requestData.startDate}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        type="date"
                        label="End Date"
                        name="endDate"
                        value={requestData.endDate}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<SendIcon />}
                    onClick={handleRequestSubmit}
                    disabled={loading}
                    sx={{
                      px: 6,
                      py: 1.5,
                      borderRadius: 3,
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      textTransform: "none",
                      background:
                        "linear-gradient(45deg, #1e3c72 30%, #2a5298 90%)",
                      boxShadow: "0 4px 14px 0 rgba(30, 60, 114, 0.39)",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #162d55 30%, #1e3c72 90%)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.23)",
                      },
                    }}
                  >
                    {loading ? "Submitting..." : "Submit Service Request"}
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%", borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ServiceRequests;
