import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const Register = () => {
  
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confpassword: "",
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
      const response = await axios.post(
        "http://localhost:5000/api/user/userRegister",
        form
      );
      console.log(response.data);
      Navigate("/login");
      
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert("Bad request. Please check your inputs and try again.");
        } else if (error.response.status === 401) {
          alert("Unauthorized. Please check your credentials and try again.");
        } else {
          alert("An error occurred. Please try again later.");
        }
      } else if (error.request) {
        alert("No response from the server. Please try again later.");
      }
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Container className="mt-5">
          <Col md="6" className="mx-auto">
            <Card>
              <Card.Body>
                <div className="title mb-4 text-center">
                  <h3>Register</h3>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your first name"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your last name"
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
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      name="confpassword"
                      value={form.confpassword}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your contact number"
                      name="mobileNo"
                      value={form.mobileNo}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  {/* <Form.Group className="mb-4">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
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
