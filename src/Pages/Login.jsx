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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!userName || !password) {
      setError("Please enter both username and password.");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const userType = response.data.userType;
        localStorage.setItem(
          "userDetails",
          JSON.stringify(response.data.userDetails)
        );

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
    } catch (error) {
      console.error(error);
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
        <Navbar />
      </div>
      <div>
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <Col md="6">
            <Card className="my-5">
              <Card.Body className="p-5">
                <div className="title mb-4 text-center">
                  <h3>Login</h3>
                </div>

                <Form.Group className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                {error && <div className="text-danger mb-3">{error}</div>}
                <Button
                  className="btn-login w-100 mb-4"
                  size="md"
                  variant="primary"
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </>
  );
}

export default Login;

// import React, { useState } from "react";
// import { Container, Col, Card, Form, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../Components/Navbar/Navbar";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//   event.preventDefault();

//   try {
//     const response = await axios.post("/server/login", {
//       email,
//       password,
//     });

//     if (response.status === 200) {
//       const userType = response.data.userType;

//       switch (userType) {
//         case "caretaker":
//           navigate("/CaretakerDashboard");
//           break;
//         case "caregiver":
//           navigate("/CaregiverDashboard");
//           break;
//         case "manager":
//           navigate("/ManagerDashboard");
//           break;
//         default:
//           setError("Invalid user type.");
//           break;
//       }
//     } catch (error) {
//       console.error(error);
//       setError("An error occurred while logging in.");
//     }
//   };

//   return (
//     <>
//       <div>
//         <Navbar />
//       </div>
//       <div>
//         <Container className="d-flex justify-content-center align-items-center vh-100">
//           <Col md="6">
//             <Card className="my-5">
//               <Card.Body className="p-5">
//                 <div className="title mb-4 text-center">
//                   <h3>Login</h3>
//                 </div>

//                 <Form.Group className="mb-4">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-4">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </Form.Group>
//                 {error && <div className="text-danger mb-3">{error}</div>}
//                 <Button
//                   className="btn-login w-100 mb-4"
//                   size="md"
//                   variant="primary"
//                   onClick={handleLogin}
//                 >
//                   Sign In
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Container>
//       </div>
//     </>
//   );
// }

// export default Login;
