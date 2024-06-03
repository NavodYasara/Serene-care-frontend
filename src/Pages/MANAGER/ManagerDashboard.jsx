import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Dropdown, Card } from "react-bootstrap";
import dayjs from "dayjs";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";

const ManagerDashboard = () => {
  // State variables to store caretakers, caregivers, and their details
  const [caretakers, setCaretakers] = useState([]);
  const [selectedCaretaker, setSelectedCaretaker] = useState(null);
  const [selectedCaregiver, setSelectedCaregiver] = useState(null);
  const [caretakerDetails, setCaretakerDetails] = useState(null);
  const [caregivers, setCaregivers] = useState([]);
  const [selectedCaregiverDetails, setSelectedCaregiverDetails] =
    useState(null);
  const [selectedCaregivers, setSelectedCaregivers] = useState({});
  const [carePlans, setCarePlans] = useState([]);

  // Fetch caretakers and caregivers data when the component mounts
  useEffect(() => {
    // Fetch caretakers data from API
    fetch("http://localhost:5000/api/manager/getCaretakerInformation")
      .then((response) => response.json())
      .then((data) => setCaretakers(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Error:", error));

    // Fetch caregivers data from API
    fetch("http://localhost:5000/api/manager/getCaregivers")
      .then((response) => response.json())
      .then((data) => setCaregivers(data))

      .catch((error) => console.error("Error:", error));
  }, []);

  // Handle click on a caretaker row to fetch and display caretaker details
  const handleRowClick = (caretaker) => {
    setSelectedCaretaker(caretaker);
    fetch(
      `http://localhost:5000/api/manager/getCaretakerById/${caretaker.caretakerId}`
    )
      .then((response) => response.json())
      .then((data) => setCaretakerDetails(data))
      .catch((error) => console.error("Error:", error));
  };

  // Handle click on a caregiver dropdown item to fetch and display caregiver details
  const handleViewCaregiver = (eventKey) => {
    const selectedCaregiver = caregivers.find(
      (caregiver) => caregiver.caregiverId.toString() === eventKey
    );

    if (selectedCaregiver) {
      fetch(
        `http://localhost:5000/api/manager/getCaregiverById/${selectedCaregiver.caregiverId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setSelectedCaregiverDetails(data);
          console.log(data);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const handleAllocateCaregiver = async (caretaker, eventKey) => {
    const selectedCaregiver = caregivers.find(
      (caregiver) => caregiver.caregiverId.toString() === eventKey
    );

    if (selectedCaregiver) {
      const caregiverId = selectedCaregiver.caregiverId;
      const caretakerId = caretaker.caretakerId;
      const requirementId = caretaker.requirementId;

      // Validate the input
      if (
        typeof caregiverId !== "number" ||
        typeof caretakerId !== "number" ||
        typeof requirementId !== "number"
      ) {
        console.error("Invalid input types");
        return;
      }

      // Fetch current caregiver for the caretaker
      fetch(`http://localhost:5000/api/manager/caretaker/${caretakerId}`)
        .then((response) => response.json())
        .then((data) => {
          // If there's no caregiver assigned or if you want to update the caregiver
          if (!data.caregiverId || data.caregiverId !== caregiverId) {
            // Update the UI
            setSelectedCaregivers({
              ...selectedCaregivers,
              [caretakerId]: {
                name: `${selectedCaregiver.firstName} (${selectedCaregiver.gender})`,
                id: caregiverId,
              },
            });

            // Fetch caregiver details (this might already be done for the dropdown)
            fetch(`http://localhost:5000/api/manager/caregivers/${caregiverId}`)
              .then((response) => response.json())
              .then((data) => {
                setSelectedCaregiver(data);

                // Allocate caregiver to caretaker via API
                // This fetch should be adjusted to match your API endpoint
                fetch(`http://localhost:5000/api/manager/allocateCaregiver`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    caretakerId: caretaker.caretakerId,
                    caregiverId: caregiverId,
                    requirementId: caretaker.requirementId,
                    // instruction: "Placeholder Instruction",
                  }),
                })
                  .then((response) => {
                    if (response.ok) {
                      console.log("Caregiver allocated successfully!");
                    } else {
                      console.error(
                        "Error allocating caregiver:",
                        response.status
                      );
                    }
                  })
                  .catch((error) => console.error("Error:", error));
              })
              .catch((error) => console.error("Error:", error));
          } else {
            // If a caregiver is already assigned, handle updating the assignment
            // Update the UI and send a PUT request to the API endpoint
            setSelectedCaregivers({
              ...selectedCaregivers,
              [caretakerId]: {
                name: `${selectedCaregiver.firstName} (${selectedCaregiver.gender})`,
                id: caregiverId,
              },
            });

            fetch(`http://localhost:5000/api/manager/allocateCaregiver`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                caretakerId: caretaker.caretakerId,
                caregiverId: caregiverId,
                requirementId: caretaker.requirementId,
                // instruction: "Placeholder Instruction",
              }),
            })
              .then((response) => {
                if (response.ok) {
                  console.log("Caregiver updated successfully!");
                } else {
                  console.error("Error updating caregiver:", response.status);
                }
              })
              .catch((error) => console.error("Error:", error));
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  // const handleAllocateCaregiver = async (caretaker, eventKey) => {
  //   const selectedCaregiver = caregivers.find(
  //     (caregiver) => caregiver.caregiverId.toString() === eventKey
  //   );

  //   if (selectedCaregiver) {
  //     const caregiverId = selectedCaregiver.caregiverId;
  //     const caretakerId = caretaker.caretakerId;
  //     const requirementId = caretaker.requirementId;
  //     // const instruction = "Placeholder Instruction";

  //     // Validate the input
  //     if (
  //       typeof caregiverId !== "number" ||
  //       typeof caretakerId !== "number" ||
  //       typeof requirementId !== "number"
  //       // typeof instruction !== "string"
  //     ) {
  //       console.error("Invalid input types");
  //       return;
  //     }

  //     setSelectedCaregivers({
  //       ...selectedCaregivers,
  //       [caretakerId]: {
  //         name: `${selectedCaregiver.firstName} (${selectedCaregiver.gender})`,
  //         id: caregiverId,
  //       },
  //     });

  //     // Fetch caregiver details
  //     fetch(`http://localhost:5000/api/manager/caregivers/${caregiverId}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // setSelectedCaregiverDetails(data);
  //         setSelectedCaregiver(data);

  //         // Allocate caregiver to caretaker via API
  //         fetch(`http://localhost:5000/api/manager/allocateCaregiver`, {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             caretakerId: caretaker.caretakerId,
  //             caregiverId: caregiverId,
  //             requirementId: caretaker.requirementId,
  //             instruction: "Placeholder Instruction",
  //           }),
  //         })
  //           .then((response) => {
  //             if (response.ok) {
  //               console.log("Caregiver allocated successfully!");
  //             } else {
  //               console.error("Error allocating caregiver:", response.status);
  //             }
  //           })
  //           .catch((error) => console.error("Error:", error));
  //       })
  //       .catch((error) => console.error("Error:", error));
  //   }
  // };

  // Calculate age from date of birth
  
  const calculateAge = (dobString) => {
    if (!dobString) {
      return "N/A";
    }
    const dob = dayjs(dobString);
    const now = dayjs();
    return now.diff(dob, "year");
  };

  const getCaretakerStatus = (caretakerId) => {
    const relatedCarePlan = carePlans.find(
      (carePlan) => carePlan.caretakerId === caretakerId
    );

    if (relatedCarePlan) {
      if (relatedCarePlan.status === "ACTIVE") {
        return "Active";
      } else if (relatedCarePlan.status === "COMPLETED") {
        return "Completed";
      } else {
        return "Pending";
      }
    } else {
      return "No Care Plan";
    }
  };

  // Get user details from local storage
  const getUserfromLocalStorage = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null;

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar for navigation */}
      <Sidebar userType={getUserfromLocalStorage?.userType} />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div className="mgd-main" style={{ padding: "20px" }}>
          <Container fluid>
            <Row>
              <Col>
                {/* Table to display caretakers */}
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th> ID </th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Category</th>
                      <th>Caregiver</th>
                      <th>Preferred Gender</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {caretakers.map((caretaker) => (
                      <tr
                        key={caretaker.caretakerId}
                        onClick={() => handleRowClick(caretaker)}
                      >
                        <td>{caretaker.caretakerId}</td>
                        <td>{caretaker.firstName}</td>
                        <td>{caretaker.lastName}</td>
                        <td>
                          {dayjs(caretaker.startDate).format("YYYY-MM-DD")}
                        </td>
                        <td>{dayjs(caretaker.endDate).format("YYYY-MM-DD")}</td>
                        <td>{caretaker.category}</td>
                        <td>
                          <Dropdown
                            onSelect={(eventKey) =>
                              handleAllocateCaregiver(caretaker, eventKey)
                            }
                          >
                            <Dropdown.Toggle
                              variant="primary"
                              id="dropdown-basic"
                            >
                              {selectedCaregivers[caretaker.caretakerId]
                                ?.name || "Select Caregiver"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {caregivers.map((caregiver) => (
                                <Dropdown.Item
                                  key={caregiver.caregiverId}
                                  eventKey={caregiver.caregiverId.toString()}
                                >
                                  {`${caregiver.firstName} (${caregiver.gender})`}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td>{caretaker.preffGender}</td>
                        <td>{getCaretakerStatus(caretaker.caretakerId)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>

            <Row>
              <Col></Col>
              <Col className="d-flex justify-content-center align-items-center mb-2">
                {/* Dropdown to watch caregivers */}
                <Dropdown
                  onSelect={(eventKey) => handleViewCaregiver(eventKey)}
                >
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Watch caregivers
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {caregivers.map((caregiver) => (
                      <Dropdown.Item
                        key={caregiver.caregiverId}
                        eventKey={caregiver.caregiverId.toString()}
                      >
                        {`${caregiver.firstName} (${caregiver.gender})`}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>

            {/* Display caretaker details */}
            {caretakerDetails && (
              <Row>
                <Col className="caretaker details section">
                  <Card>
                    <Card.Body>
                      <Card.Title>Caretaker Information</Card.Title>
                      <Card.Text>
                        <p>
                          Name:{" "}
                          {`${caretakerDetails.firstName} ${caretakerDetails.lastName}`}
                        </p>
                        <p>
                          Medical Conditions:{" "}
                          {caretakerDetails.mediCondition || "N/A"}
                        </p>
                        <p>
                          Emergency Contact:{" "}
                          {caretakerDetails.emergCont || "N/A"}
                        </p>
                        <p>Address: {caretakerDetails.address}</p>
                        <p>Requirement: {caretakerDetails.requirement}</p>
                        Age: {calculateAge(caretakerDetails.formattedDob)}
                        {/* <p>category : {caretakerDetails.}</p> */}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>

                {/* Display caregiver details */}
                <Col>
                  {selectedCaregiverDetails && (
                    <Card>
                      <Card.Body>
                        <Card.Title>Caregiver Information</Card.Title>
                        <Card.Text>
                          <p>
                            Name:{" "}
                            {`${selectedCaregiverDetails.firstName} ${selectedCaregiverDetails.lastName}`}
                          </p>
                          <p>
                            Availability:{" "}
                            {selectedCaregiverDetails.availability ===
                            "AVAILABLE"
                              ? "Available"
                              : "Unavailable"}
                          </p>
                          <p>Gender: {selectedCaregiverDetails.gender}</p>
                          <p>Mobile No: {selectedCaregiverDetails.mobileNo}</p>
                          <p> Address : {selectedCaregiverDetails.address}</p>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  )}
                </Col>
              </Row>
            )}
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
