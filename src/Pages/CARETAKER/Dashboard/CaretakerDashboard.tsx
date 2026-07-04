import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
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
  TextField,
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
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";

const CaretakerDashboard = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nationalId: "",
    mobileNo: "",
    dob: "",
    address: "",
    mediCon: "",
    emergCont: "",
    category: "",
  });
  const [originalProfileData, setOriginalProfileData] = useState<any>({});
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const { userProfile: user = {} } = useAuth();

  useEffect(() => {
    const fetchCaretakerData = async () => {
      try {
        const response = await axios
          .get("http://localhost:5000/api/user/getCaretakerProfile", {
            params: { userId: user.userId },
          })
          .catch(() => ({ data: null }));

        if (response.data) {
          setOriginalProfileData(response.data);
          setProfileData(response.data);
        } else {
          // Fallback to basic user info from localStorage if profile isn't found
          setProfileData((prev) => ({
            ...prev,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            mobileNo: user.mobileNo || "",
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
      await axios.put(
        "http://localhost:5000/api/user/updateCaretakerProfile",
        updatedProfileData,
      );
      setOriginalProfileData({ ...profileData });
      setOpen(false);
      localStorage.setItem("profileData", JSON.stringify(updatedProfileData));
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const InfoRow = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value: string;
  }) => (
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
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block" }}
        >
          {label}
        </Typography>
        <Typography variant="body1" fontWeight="500">
          {value || "Not set"}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 4, overflowX: "hidden" }}>
      <Container maxWidth="lg">
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
                    {profileData.firstName?.charAt(0) ||
                      user.email?.charAt(0) ||
                      "U"}
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold">
                    {profileData.firstName} {profileData.lastName}
                  </Typography>

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
                      background:
                        "linear-gradient(45deg, #1e3c72 30%, #2a5298 90%)",
                      boxShadow: "0 3px 5px 2px rgba(30, 60, 114, .3)",
                    }}
                  >
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats Card */}
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Healthcare Overview
                  </Typography>
                  <Stack spacing={2} sx={{ mt: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2">Plan Status</Typography>
                      <Chip size="small" label="Active" color="success" />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2">Last Checkup</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        2 days ago
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body2">
                        Assigned Caregiver
                      </Typography>
                      <Typography variant="body2" color="primary">
                        Dr. Smith
                      </Typography>
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
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "#fafafa",
                    borderBottom: "1px solid #efefef",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Account Details
                  </Typography>
                </Box>
                <CardContent>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <BadgeIcon color="primary" /> Personal
                      </Typography>
                      <InfoRow
                        icon={BadgeIcon}
                        label="Medicare Number"
                        value={profileData.nationalId}
                      />
                      <InfoRow
                        icon={CakeIcon}
                        label="Date of Birth"
                        value={profileData.dob}
                      />
                      <InfoRow
                        icon={HomeIcon}
                        label="Address"
                        value={profileData.address}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <MedicalServicesIcon color="primary" /> Health & Contact
                      </Typography>
                      <InfoRow
                        icon={PhoneIcon}
                        label="Phone Number"
                        value={profileData.mobileNo}
                      />
                      <InfoRow
                        icon={MedicalServicesIcon}
                        label="Medical Condition"
                        value={profileData.mediCon}
                      />
                      <InfoRow
                        icon={ContactPhoneIcon}
                        label="Emergency Contact"
                        value={profileData.emergCont}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Recent Activity Section */}
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "#fafafa",
                    borderBottom: "1px solid #efefef",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
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
                      <Typography variant="caption" color="text.secondary">
                        Today
                      </Typography>
                    </ListItem>
                    <ListItem divider>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Profile Verified"
                        secondary="Your medicare number has been verified successfully"
                      />
                      <Typography variant="caption" color="text.secondary">
                        Yesterday
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="System Login"
                        secondary="Successful login from a new device"
                      />
                      <Typography variant="caption" color="text.secondary">
                        2 days ago
                      </Typography>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Edit Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 4, overflow: "hidden" },
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
            color: "white",
            px: 4,
            py: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Update Your Profile
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
            Keep your information up to date to ensure seamless care management.
          </Typography>
        </Box>

        <DialogContent sx={{ p: 4, bgcolor: "#f8faff" }}>
          <Stack spacing={4}>
            {/* Personal Details Section */}
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 2,
                  color: "#1e3c72",
                }}
              >
                <PersonIcon color="primary" /> Personal Details
              </Typography>
              <Card
                sx={{
                  p: 2,
                  borderRadius: 3,
                  boxShadow: "0 2px 10px 0 rgba(0,0,0,0.03)",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      name="firstName"
                      value={profileData.firstName || ""}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      name="lastName"
                      value={profileData.lastName || ""}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email Address"
                      name="email"
                      value={profileData.email || ""}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Date of Birth"
                      type="date"
                      name="dob"
                      value={profileData.dob || ""}
                      onChange={handleChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CakeIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="National ID"
                      name="nationalId"
                      value={profileData.nationalId || ""}
                      onChange={handleChange}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BadgeIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Card>
            </Box>

            {/* Contact Details Section */}
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 2,
                  color: "#1e3c72",
                }}
              >
                <PhoneIcon color="primary" /> Contact & Address
              </Typography>
              <Card
                sx={{
                  p: 2,
                  borderRadius: 3,
                  boxShadow: "0 2px 10px 0 rgba(0,0,0,0.03)",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Contact Number"
                      name="mobileNo"
                      value={profileData.mobileNo || ""}
                      onChange={handleChange}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Emergency Contact"
                      name="emergCont"
                      value={profileData.emergCont || ""}
                      onChange={handleChange}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ContactPhoneIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Home Address"
                      name="address"
                      value={profileData.address || ""}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={2}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ alignSelf: "flex-start", mt: 1.5 }}
                          >
                            <HomeIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Card>
            </Box>

            {/* Health Condition Section */}
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 2,
                  color: "#1e3c72",
                }}
              >
                <MedicalServicesIcon color="primary" /> Medical Condition
              </Typography>
              <Card
                sx={{
                  p: 2,
                  borderRadius: 3,
                  boxShadow: "0 2px 10px 0 rgba(0,0,0,0.03)",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      label="Medical Conditions or Notes"
                      name="mediCon"
                      value={profileData.mediCon || ""}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={3}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ alignSelf: "flex-start", mt: 1.5 }}
                          >
                            <MedicalServicesIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Card>
            </Box>
          </Stack>
        </DialogContent>
        <Divider />
        <DialogActions
          sx={{
            p: 3,
            bgcolor: "#fff",
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            size="large"
            sx={{
              fontWeight: "bold",
              borderRadius: 2,
              borderColor: "#ccc",
              color: "text.secondary",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleProfileSave}
            variant="contained"
            size="large"
            disableElevation
            sx={{
              px: 4,
              borderRadius: 2,
              fontWeight: "bold",
              background: "linear-gradient(45deg, #1e3c72 30%, #2a5298 90%)",
              boxShadow: "0 4px 12px 0 rgba(30, 60, 114, 0.2)",
              "&:hover": {
                transform: "translateY(-1px)",
                boxShadow: "0 6px 16px 0 rgba(30, 60, 114, 0.3)",
              },
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
