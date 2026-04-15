import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import img1 from "../../Assets/img1.png";
import { useNavigate } from "react-router-dom";

function NavbarComponent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      setUser(JSON.parse(userDetails));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    setUser(null);
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

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm" sticky="top">
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img
            alt="LOGO"
            src={img1}
            width="35"
            height="35"
            className="d-inline-block align-top"
          />
          <span className="ms-2 fw-bold" style={{ color: "#1e3c72" }}>
            Serene Care
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>

            {user ? (
              <>
                <Nav.Link onClick={() => navigate(getDashboardPath())}>
                  Dashboard
                </Nav.Link>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-lg-3 mt-2 mt-lg-0 px-3"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="ms-lg-3 px-3"
                  onClick={() => navigate("/Login")}
                >
                  Login
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
