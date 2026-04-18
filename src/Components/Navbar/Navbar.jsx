import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Container, Typography, Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import img1 from "../../Assets/img1.png";

function NavbarComponent() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const navigate = useNavigate();

  const hideLoginPath = ["/Login"]
  const isLoginPage = hideLoginPath.includes(location.pathname);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      setUser(JSON.parse(userDetails));
    }
  }, []);



  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    setUser(null);
    handleMobileMenuClose();
    navigate("/Login");
  };

  const getDashboardPath = () => {
    if (!user) return "/Login";
    const type = user.userType?.toLowerCase();
    if (type === "caretaker") return "/CaretakerDashboard";
    if (type === "caregiver") return "/CaregiverDashboard";
    if (type === "admin") return "/AdminDashboard";
    if (type === "manager") return "/ManagerDashboard";
    return "/Login";
  };

  const navItemStyle = {
    color: "#2D3748",
    fontWeight: 600,
    textTransform: "none",
    fontSize: "1.05rem",
    mx: 1.5,
    "&:hover": {
      color: "#2E8B57",
      backgroundColor: "transparent",
    }
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: "rgba(255, 255, 255, 0.85)", 
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        color: "#1A202C",
        borderBottom: "1px solid rgba(0,0,0,0.05)"
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: "80px" }}>
          {/* Logo Section */}
          <Box 
            onClick={() => navigate("/")} 
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexGrow: { xs: 1, md: 0 }, mr: 4 }}
          >
            <Box
              component="img"
              src={img1}
              alt="Serene Care Logo"
              sx={{ height: 44, width: 44, mr: 2 }}
            />
            <Typography
              variant="h5"
              noWrap
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.5px',
                color: '#2E8B57',
              }}
            >
              Serene Care
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button onClick={() => navigate("/")} sx={navItemStyle}>
              Home
            </Button>
            
            {user ? (
              <>
                <Button onClick={() => navigate(getDashboardPath())} sx={navItemStyle}>
                  Dashboard
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={handleLogout}
                  sx={{ 
                    ml: 3, 
                    color: "#E53E3E", 
                    borderColor: "rgba(229, 62, 62, 0.5)",
                    borderRadius: "30px",
                    px: 3,
                    py: 1,
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "rgba(229, 62, 62, 0.04)",
                      borderColor: "#C53030"
                    }
                  }}
                >
                  Logout
                </Button>
              </>
            ) : !isLoginPage && (
              <Button 
                variant="contained" 
                onClick={() => navigate("/Login")}
                sx={{ 
                  ml: 3, 
                  backgroundColor: "#2E8B57",
                  color: "white",
                  borderRadius: "30px",
                  px: 4,
                  py: 1,
                  fontSize: "1.05rem",
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#246e45",
                    boxShadow: "0 4px 10px -1px rgba(46, 139, 87, 0.4)"
                  }
                }}
              >
                Login
              </Button>
            )}
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      
      {/* Mobile Menu Dropdown */}
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        PaperProps={{
          sx: { width: 250, mt: 1.5, borderRadius: 3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }
        }}
      >
        <MenuItem onClick={() => { navigate("/"); handleMobileMenuClose(); }} sx={{ py: 1.5 }}>
          <Typography textAlign="center" fontWeight={600} color="#2D3748">Home</Typography>
        </MenuItem>
        
        {user ? (
          [
            <MenuItem key="dashboard" onClick={() => { navigate(getDashboardPath()); handleMobileMenuClose(); }} sx={{ py: 1.5 }}>
              <Typography textAlign="center" fontWeight={600} color="#2D3748">Dashboard</Typography>
            </MenuItem>,
            <MenuItem key="logout" onClick={handleLogout} sx={{ py: 1.5 }}>
              <Typography textAlign="center" fontWeight={600} color="#E53E3E">Logout</Typography>
            </MenuItem>
          ]
        ) : (
          <MenuItem onClick={() => { navigate("/Login"); handleMobileMenuClose(); }} sx={{ py: 1.5 }}>
            <Typography textAlign="center" fontWeight={600} color="#2E8B57">Login</Typography>
          </MenuItem>
        )}
      </Menu>
    </AppBar>
  );
}

export default NavbarComponent;
