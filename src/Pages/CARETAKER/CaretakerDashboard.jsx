import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import { Container, Table, Dropdown } from "react-bootstrap";
import Button from "@mui/material/Button";
import axios from "axios";

function CaretakerDashboard() {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    contactNumber: "",
    requirements: "",
    gender: "",
    selectedCategory: "",
  });
  const [originalProfileData, setOriginalProfileData] = useState({});
  const [caregivers, setCaregivers] = useState([]);

  useEffect(() => {
    // Save original profile data when component mounts
    setOriginalProfileData({ ...profileData });
    // Fetch allocated caregivers
    fetchCaregivers();
  }, []);

  const fetchCaregivers = async () => {
    try {
      // Example API call to fetch caregivers
      const response = await axios.get(
        "http://localhost:5000/server/caregivers"
      );
      setCaregivers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    // Reset edited profile data to original values
    setProfileData({ ...originalProfileData });
    setEditMode(false);
  };

  const handleSave = async () => {
    try {
      // Save the edited profile data
      setEditMode(false);
      setOriginalProfileData({ ...profileData });
      const response = await axios.put(
        "http://localhost:5000/server/updatecaretakerprofile",
        profileData
      );
      console.log(response.data);

      // Update original profile data with edited profile data
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div
        fluid
        id="main-container"
        className="vh-100 "
        style={{ width: "100%", marginTop: "100px" }}
      >
        <div id="profile-container">
          <Container>
            <div className="flex-grow-2">
              <div className="d-flex justify-content-center align-items-center h-100">
                <div
                  className="text-center p-4 shadow rounded"
                  style={{ width: "50vw" }}
                >
                  <Table borderless className="invisible-table">
                    <tbody>
                      <tr>
                        <td className="fw-bold">First Name:</td>
                        <td>
                          {editMode ? (
                            <input
                              type="text"
                              name="firstName"
                              value={profileData.firstName}
                              onChange={handleChange}
                            />
                          ) : (
                            profileData.firstName
                          )}
                        </td>
                      </tr>
                    <tr>
                      <td className="fw-bold">Last Name:</td>
                      <td>
                        {editMode ? (
                          <input
                            type="text"
                            name="lastName"
                            value={profileData.lastName}
                            onChange={handleChange}
                          />
                        ) : (
                          profileData.lastName
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Date of Birth:</td>
                      <td>
                        {editMode ? (
                          <input
                            type="text"
                            name="dob"
                            value={profileData.dob}
                            onChange={handleChange}
                          />
                        ) : (
                          profileData.dob
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Address:</td>
                      <td>
                        {editMode ? (
                          <input
                            type="text"
                            name="address"
                            value={profileData.address}
                            onChange={handleChange}
                          />
                        ) : (
                          profileData.address
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Gender:</td>
                      <td>
                        {editMode ? (
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown-basic"
                            >
                              {profileData.gender || "Select Gender"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() =>
                                  setProfileData({
                                    ...profileData,
                                    gender: "male",
                                  })
                                }
                              >
                                Male
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  setProfileData({
                                    ...profileData,
                                    gender: "female",
                                  })
                                }
                              >
                                Female
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  setProfileData({
                                    ...profileData,
                                    gender: "other",
                                  })
                                }
                              >
                                Other
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        ) : (
                          profileData.gender
                        )}
                      </td>
                    </tr>

                    {/* Repeat for other profile fields */}
                    <tr>
                      <td className="fw-bold">Selected Category:</td>
                      <td>
                        {editMode ? (
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown-basic"
                            >
                              {profileData.selectedCategory ||
                                "Select Category"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() =>
                                  setProfileData({
                                    ...profileData,
                                    selectedCategory: "Mental disorders",
                                  })
                                }
                              >
                                Mental disorders
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  setProfileData({
                                    ...profileData,
                                    selectedCategory: "Physical Disability",
                                  })
                                }
                              >
                                Physical Disability
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() =>
                                  setProfileData({
                                    ...profileData,
                                    selectedCategory: "Eldering",
                                  })
                                }
                              >
                                Eldering
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        ) : (
                          profileData.selectedCategory
                        )}
                      </td>
                    </tr>
                    </tbody>
                  </Table>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    {editMode ? (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginRight: "10px" }}
                          onClick={handleSave}
                        >
                          Ok
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEditProfile}
                      >
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div id="requirements-container">
          <Container>
            <div className="flex-grow-2">
              <div className="d-flex justify-content-center align-items-center h-100">
                <div
                  className="text-center p-4 shadow rounded"
                  style={{ width: "50vw" }}
                >
                  <h2>Caretaker's Requirements</h2>
                  <p>
                    Here, you can list the caretaker's requirements, such as
                    skills, experience, availability, etc.
                  </p>
                  <p>
                    Example:
                    <ul>
                      <li>Experience in caring for elderly individuals</li>
                      <li>Basic first aid knowledge</li>
                      <li>Good communication skills</li>
                      <li>Flexibility in working hours</li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div id="caregivers-container">
          <Container>
            <div className="flex-grow-2">
              <div className="d-flex justify-content-center align-items-center h-100">
                <div
                  className="text-center p-4 shadow rounded"
                  style={{ width: "50vw" }}
                >
                  <h2>Allocated Caregivers</h2>
                  <div className="card-container">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Specialization</th>
                          <th>Experience (years)</th>
                          <th>Availability</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>John Doe</td>
                          <td>Elderly Care</td>
                          <td>5</td>
                          <td>Full-time</td>
                        </tr>
                        <tr>
                          <td>Jane Smith</td>
                          <td>Home Care</td>
                          <td>3</td>
                          <td>Part-time</td>
                        </tr>
                        {/* Add more rows as needed */}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default CaretakerDashboard;
