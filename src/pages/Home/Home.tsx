import React from "react";
import { Container, Grid, Typography, Card, CardContent, Box, Button, Fade } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GroupsIcon from "@mui/icons-material/Groups";
import HouseIcon from "@mui/icons-material/House";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import Navbar from '../../components/Navbar/Navbar';
import heroImage from "../../Assets/hero_image.png";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Personal Care",
    description: "Assistance with showering, grooming, dressing, meal preparation, and toileting.",
    icon: <FavoriteBorderIcon sx={{ fontSize: 40, color: "#2E8B57" }} />,
  },
  {
    title: "Domestic Care",
    description: "Household cleaning and maintenance to keep your environment completely safe and comfortable.",
    icon: <HouseIcon sx={{ fontSize: 40, color: "#2E8B57" }} />,
  },
  {
    title: "Community Access",
    description: "Support in accessing and actively participating in your local community events.",
    icon: <GroupsIcon sx={{ fontSize: 40, color: "#2E8B57" }} />,
  },
  {
    title: "Respite",
    description: "In-home or community-based respite services ensuring peace of mind for everyone.",
    icon: <SupportAgentIcon sx={{ fontSize: 40, color: "#2E8B57" }} />,
  },
  {
    title: "Therapy Support",
    description: "Assistance in accessing therapy sessions and maximizing overall personal well-being.",
    icon: <HealthAndSafetyIcon sx={{ fontSize: 40, color: "#2E8B57" }} />,
  },
  {
    title: "Skill Development",
    description: "Guidance and hands-on support to uniquely enhance and build various life skills.",
    icon: <EmojiPeopleIcon sx={{ fontSize: 40, color: "#2E8B57" }} />,
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0, right: 0, bottom: 0, left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, color: "white", textAlign: "center" }}>
          <Fade in timeout={1500}>
            <Box>
              <Typography variant="h2" component="h1" fontWeight={800} gutterBottom sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, textShadow: "0px 4px 10px rgba(0,0,0,0.5)" }}>
                Empowering Independence
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.8, textShadow: "0px 2px 5px rgba(0,0,0,0.5)" }}>
                Dedicated to providing high-quality care solutions for individuals with disabilities. We promote dignity, wellbeing, and dedicated support for entirely independent living.
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                onClick={() => navigate("/onboard")}
                sx={{ backgroundColor: "#2E8B57", color: "white", px: 4, py: 1.5, fontSize: "1.1rem", borderRadius: "30px", textTransform: "none", mr: 2, "&:hover": { backgroundColor: "#246e45", transform: "translateY(-2px)", transition: "all 0.3s" } }}
              >
                Register as Caretaker
              </Button>
              <Button variant="outlined" size="large" sx={{ color: "white", borderColor: "white", px: 4, py: 1.5, fontSize: "1.1rem", borderRadius: "30px", textTransform: "none", "&:hover": { backgroundColor: "rgba(255,255,255,0.1)", transform: "translateY(-2px)", transition: "all 0.3s" } }}>
                Contact Us
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#F7F9FA" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="overline" sx={{ color: "#2E8B57", fontWeight: 700, letterSpacing: 2 }}>
              WHAT WE OFFER
            </Typography>
            <Typography variant="h3" fontWeight={700} gutterBottom sx={{ mt: 1, color: "#1A202C" }}>
              Our Specialized Services
            </Typography>
            <Typography variant="body1" sx={{ color: "#4A5568", maxWidth: "600px", mx: "auto" }}>
              At Serene Care, our core mission is to prioritize the lifestyle choices of individuals receiving disability services.
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  elevation={0}
                  sx={{ 
                    height: "100%", 
                    p: 3,
                    borderRadius: 4,
                    border: "1px solid #E2E8F0",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      borderColor: "transparent"
                    }
                  }}
                >
                  <Box sx={{ mb: 2, display: "inline-flex", p: 2, backgroundColor: "rgba(46, 139, 87, 0.1)", borderRadius: "16px" }}>
                    {service.icon}
                  </Box>
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: "#2D3748" }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#718096", lineHeight: 1.7, fontSize: "0.95rem" }}>
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 10, px: 2, backgroundColor: "#1A202C", color: "white", textAlign: "center" }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={800} gutterBottom>
            Ready to Take the Next Step?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, fontWeight: 400, opacity: 0.8 }}>
            Reach out today to discuss a tailored care plan designed exclusively for your unique needs.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            onClick={() => navigate("/onboard")}
            sx={{ backgroundColor: "#2E8B57", color: "white", px: 5, py: 2, fontSize: "1.1rem", borderRadius: "30px", textTransform: "none", "&:hover": { backgroundColor: "#246e45" } }}
          >
            Register Now
          </Button>
        </Container>
      </Box>
    </>
  );
}
