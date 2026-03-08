import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Components/Sidebar";
import {
  Container,
  Grid,
  Box,
  Typography,
  Avatar,
  Divider,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Stack,
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import BadgeIcon from "@mui/icons-material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const CaretakerDashboard = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    nationalId: "",
    mobileNo: "",
    dob: "",
    address: "",
    mediCondition: "",
    emergCont: "",
    category: "",
  });
  const [originalProfileData, setOriginalProfileData] = useState({});
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const user = JSON.parse(localStorage.getItem("userDetails")) || {};

  useEffect(() => {
    const fetchCaretakerData = async () => {
      try {
        // Since we saw inconsistent naming in the backend, let's try to fetch user details first
        // In a real app, this would be a specific endpoint for the caretaker's patient profile.
        const response = await axios.get(
          "http://localhost:5000/api/user/getCaretakerData",
          {
            params: { userId: user.userId },
          }
        ).catch(() => ({ data: null })); // Fallback if endpoint doesn't exist yet
        
        if (response.data) {
          setOriginalProfileData(response.data);
          setProfileData(response.data);
        } else {
          // Fallback to basic user info from localStorage if profile isn't found
          setProfileData(prev => ({ 
            ...prev, 
            firstName: user.firstName || "", 
            lastName: user.lastName || "",
            mobileNo: user.mobileNo || ""
          }));
        }
      } catch (error) {
        console.error("Error fetching caretaker data:", error);
      }
    };

    if (user.userId) {
      fetchCaretakerData();
    }
  }, [user.userId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setProfileData({ ...originalProfileData });
    setOpen(false);
  };

  const handleProfileSave = async () => {
    try {
      const updatedProfileData = {
        ...profileData,
        userId: user.userId,
      };
      await axios.post(
        "http://localhost:5000/api/user/registerPatient", 
        updatedProfileData
      );
      setOriginalProfileData({ ...profileData });
      setOpen(false);
      localStorage.setItem("profileData", JSON.stringify(updatedProfileData));
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const InfoRow = ({ icon: Icon, label, value }) => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Avatar
        sx={{
          bgcolor: theme.palette.primary.light,
          width: 38,
          height: 38,
          mr: 2,
        }}
      >
        <Icon sx={{ fontSize: 20, color: theme.palette.primary.main }} />
      </Avatar>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
          {label}
        </Typography>
        <Typography variant="body1" fontWeight="500">
          {value || "Not set"}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", bgcolor: "#f4f7fe", minHeight: "100vh" }}>
      <Sidebar userType={user.userType} />
      <Box component="main" sx={{ flexGrow: 1, p: 4, overflowX: "hidden" }}>
        <Container maxWidth="lg">
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
            <Box sx={{ position: "relative", zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Welcome back, {profileData.firstName || user.firstName || user.userName || "Guest"}!
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8 }}>
                        Your health profile is up to date. Managing your care has never been easier.
                    </Typography>
                </Box>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Typography variant="h3" sx={{ opacity: 0.2, fontWeight: 'bold' }}>
                        SERENE
                    </Typography>
                </Box>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.1)",
              }}
            />
          </Box>

          <Grid container spacing={4}>
            {/* Left Column: Profile Card */}
            <Grid item xs={12} md={4}>
              <Stack spacing={4}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
                    textAlign: "center",
                  }}
                >
                  <CardContent sx={{ pt: 4 }}>
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        margin: "0 auto",
                        mb: 2,
                        border: `4px solid ${theme.palette.primary.light}`,
                        fontSize: "3rem",
                        bgcolor: theme.palette.primary.main,
                      }}
                    >
                      {profileData.firstName?.charAt(0) || user.userName?.charAt(0) || "U"}
                    </Avatar>
                    <Typography variant="h5" fontWeight="bold">
                      {profileData.firstName} {profileData.lastName}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      {user.userType?.toUpperCase()} ID: #{user.userId}
                    </Typography>
                    <Chip
                      label={profileData.category || "General"}
                      color="primary"
                      variant="outlined"
                      sx={{ textTransform: "capitalize", px: 2, mb: 3 }}
                    />
                    <Divider sx={{ my: 1 }} />
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={handleClickOpen}
                      sx={{
                        mt: 2,
                        borderRadius: 2,
                        py: 1,
                        background: "linear-gradient(45deg, #1e3c72 30%, #2a5298 90%)",
                        boxShadow: "0 3px 5px 2px rgba(30, 60, 114, .3)",
                      }}
                    >
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Stats Card */}
                <Card sx={{ borderRadius: 4, boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)" }}>
                    <CardContent>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Healthcare Overview
                        </Typography>
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2">Plan Status</Typography>
                                <Chip size="small" label="Active" color="success" />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2">Last Checkup</Typography>
                                <Typography variant="body2" fontWeight="bold">2 days ago</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2">Assigned Caregiver</Typography>
                                <Typography variant="body2" color="primary">Dr. Smith</Typography>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
              </Stack>
            </Grid>

            {/* Right Column: Detailed Info & Timeline */}
            <Grid item xs={12} md={8}>
              <Stack spacing={4}>
                {/* Information Sections */}
                <Card sx={{ borderRadius: 4, boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)" }}>
                  <Box sx={{ p: 2, bgcolor: "#fafafa", borderBottom: "1px solid #efefef" }}>
                    <Typography variant="h6" fontWeight="bold">
                      Account Details
                    </Typography>
                  </Box>
                  <CardContent>
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <BadgeIcon color="primary" /> Personal
                        </Typography>
                        <InfoRow icon={BadgeIcon} label="Medicare Number" value={profileData.nationalId} />
                        <InfoRow icon={CakeIcon} label="Date of Birth" value={profileData.dob} />
                        <InfoRow icon={HomeIcon} label="Address" value={profileData.address} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <MedicalServicesIcon color="primary" /> Health & Contact
                        </Typography>
                        <InfoRow icon={PhoneIcon} label="Phone Number" value={profileData.mobileNo} />
                        <InfoRow icon={MedicalServicesIcon} label="Medical Condition" value={profileData.mediCondition} />
                        <InfoRow icon={ContactPhoneIcon} label="Emergency Contact" value={profileData.emergCont} />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* Recent Activity Section */}
                <Card sx={{ borderRadius: 4, boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)" }}>
                  <Box sx={{ p: 2, bgcolor: "#fafafa", borderBottom: "1px solid #efefef", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <HistoryIcon /> Recent Activity
                    </Typography>
                    <Button size="small">View All</Button>
                  </Box>
                  <CardContent sx={{ p: 0 }}>
                    <List>
                        <ListItem divider>
                            <ListItemIcon>
                                <CheckCircleOutlineIcon color="success" />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Care Plan Updated" 
                                secondary="Your daily medication plan was updated by Manager" 
                            />
                            <Typography variant="caption" color="text.secondary">Today</Typography>
                        </ListItem>
                        <ListItem divider>
                            <ListItemIcon>
                                <CheckCircleOutlineIcon color="success" />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Profile Verified" 
                                secondary="Your medicare number has been verified successfully" 
                            />
                            <Typography variant="caption" color="text.secondary">Yesterday</Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CheckCircleOutlineIcon color="success" />
                            </ListItemIcon>
                            <ListItemText 
                                primary="System Login" 
                                secondary="Successful login from a new device" 
                            />
                            <Typography variant="caption" color="text.secondary">2 days ago</Typography>
                        </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Edit Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 4, p: 1 },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", pb: 1 }}>Update Your Profile</DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          <Stack spacing={3}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="First Name"
                name="firstName"
                value={profileData.firstName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={profileData.lastName}
                onChange={handleChange}
                fullWidth
              />
            </Box>
            <TextField
              label="Medicare Number"
              name="nationalId"
              value={profileData.nationalId}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Contact Number"
              name="mobileNo"
              value={profileData.mobileNo}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Date of Birth"
              type="date"
              name="dob"
              value={profileData.dob}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Address"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
            />
            <TextField
              label="Medical Condition"
              name="mediCondition"
              value={profileData.mediCondition}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
            />
            <TextField
              label="Emergency Contact"
              name="emergCont"
              value={profileData.emergCont}
              onChange={handleChange}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={profileData.category}
                label="Category"
                onChange={handleChange}
              >
                <MenuItem value={"mental"}>Mental Health</MenuItem>
                <MenuItem value={"disabled"}>Disabled Care</MenuItem>
                <MenuItem value={"eldering"}>Elderly Care</MenuItem>
                <MenuItem value={"others"}>Other Special Needs</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} color="inherit" sx={{ fontWeight: "bold" }}>
            Cancel
          </Button>
          <Button
            onClick={handleProfileSave}
            variant="contained"
            sx={{
              px: 4,
              borderRadius: 2,
              fontWeight: "bold",
              background: "linear-gradient(45deg, #1e3c72 30%, #2a5298 90%)",
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CaretakerDashboard;
