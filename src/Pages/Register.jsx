import React, { useState } from "react";
import {
  Container,
  Box,
  Card,
  TextField,
  Button,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const Register = () => {
  
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confPassword: "",
    mobileNo: "",
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload
    try {
      // Submit the form if all validations pass
      const response = await axios.post(
        "http://localhost:5000/api/user/userRegister",
        form
      );
      console.log(response.data);
      Navigate("/login");
      
    } catch (error) {
      // Handle axios request errors
      if (error.response) {
        if (error.response.status === 400) {
          setError("Bad request. Please check your inputs and try again.");
        } else if (error.response.status === 401) {
          setError(
            "Unauthorized. Please check your credentials and try again."
          );
        } else if (error.response.status === 409) {
          setError(
            "Username already exists. Please choose a different username."
          );
        } else {
          setError("An error occurred. Please try again later.");
        }
      } else if (error.request) {
        alert("No response from the server. Please try again later.");
      }
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="md">
        <Box mt={8}>
          <Card>
            <Box p={3}>
              <Box mb={4} textAlign="center">
                <h3>Register</h3>
              </Box>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your last name"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      type="password"
                      label="Password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      type="password"
                      placeholder="Enter your password"
                      name="confpassword"
                      value={form.confpassword}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Contact Number"
                      name="mobileNo"
                      value={form.mobileNo}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  {/* <Form.Group className="mb-4">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      label="Date of Birth"
                      name="dob"
                      value={form.dob}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                    />
                  </Form.Group> */}
                  <Form.Group className="mb-4">
                    <Form.Label>User Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="userType"
                      value={form.userType}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="admin">Admin</option>
                      <option value="caretaker">Caretaker</option>
                      <option value="recipient">Recipient</option>
                    </Form.Control>
                  </Form.Group>
                  <Row>
                    <Col md="12">
                      <Button
                        className="w-100 mb-4"
                        size="md"
                        variant="primary"
                        type="submit"
                      >
                        Sign Up
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </>
  );
};

export default Register;
