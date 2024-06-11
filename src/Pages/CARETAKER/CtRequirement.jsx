import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Dropdown,
  Alert,
} from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";

const RequirementsAndCaregiversPage = () => {
  const getUserfromLocalStorage = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : null;

  const [profileData, setProfileData] = useState({
    preffGender: "",
    startDate: "",
    endDate: "",
    requirement: "",
    caretakerId: "",
  });

  const [caretakers, setCaretakers] = useState([]);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!profileData.requirement)
      formErrors.requirement = "Requirements are required.";
    if (!profileData.preffGender)
      formErrors.preffGender = "Preferred gender is required.";
    if (!profileData.startDate)
      formErrors.startDate = "Start date is required.";
    if (!profileData.endDate) formErrors.endDate = "End date is required.";
    if (!profileData.caretakerId)
      formErrors.caretakerId = "Caretaker selection is required.";
    return formErrors;
  };

  const handleRequirementsSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setShowAlert(true);
      return;
    }

    const requirementProfileData = {
      ...profileData,
      userId: getUserfromLocalStorage.userId,
      status: "pending",
    };

    try {
      await axios.post(
        "http://localhost:5000/api/requirement/insertRequirement",
        requirementProfileData
      );

      setProfileData({
        requirement: "",
        preffGender: "",
        startDate: "",
        endDate: "",
        caretakerId: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error saving requirements:", error);
    }
  };

  const handleSelectCaretaker = (caretakerId) => {
    setProfileData({ ...profileData, caretakerId });
  };

  useEffect(() => {
    const fetchCaretakers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/requirement/getAllcaretakers"
        );
        const allCaretakers = response.data;

        const userId = getUserfromLocalStorage.userId;
        const filteredCaretakers = allCaretakers.filter(
          (caretaker) => caretaker.userId === userId
        );

        setCaretakers(filteredCaretakers);
      } catch (error) {
        console.error("Error fetching caretakers:", error);
      }
    };

    fetchCaretakers();
  }, [getUserfromLocalStorage.userId]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar userType={getUserfromLocalStorage.userType} />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div className="mgd-main" style={{ padding: "20px" }}>
          <Container fluid>
            {showAlert && (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                {Object.values(errors).map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </Alert>
            )}
            <Card className="mb-4">
              <Card.Body>
                <h2 className="mb-4">Submit Your Service Request</h2>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group controlId="requirements">
                        <Form.Label>Requirements</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="requirement"
                          value={profileData.requirement}
                          onChange={handleInputChange}
                          placeholder="Enter your service requirements..."
                          isInvalid={!!errors.requirement}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.requirement}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="preffGender">
                        <Form.Label>Preferences</Form.Label>
                        <Form.Select
                          name="preffGender"
                          value={profileData.preffGender}
                          onChange={handleInputChange}
                          isInvalid={!!errors.preffGender}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.preffGender}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Dropdown onSelect={handleSelectCaretaker}>
                        <Dropdown.Toggle
                          variant="secondary"
                          id="dropdown-basic"
                        >
                          Select caretaker
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {caretakers.map((caretaker) => (
                            <Dropdown.Item
                              key={caretaker.caretakerId}
                              eventKey={caretaker.caretakerId}
                            >
                              {`${caretaker.firstName} (${caretaker.caretakerId})`}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                      {errors.caretakerId && (
                        <div className="invalid-feedback d-block">
                          {errors.caretakerId}
                        </div>
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group controlId="startDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="startDate"
                          value={profileData.startDate}
                          onChange={handleInputChange}
                          isInvalid={!!errors.startDate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.startDate}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="endDate">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="endDate"
                          value={profileData.endDate}
                          onChange={handleInputChange}
                          isInvalid={!!errors.endDate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.endDate}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    variant="primary"
                    type="button"
                    onClick={handleRequirementsSave}
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "20px",
                    }}
                  >
                    Submit Request
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default RequirementsAndCaregiversPage;

// import React, { useState, useEffect } from "react";
// import { Container, Form, Button, Row, Col, Card, Dropdown } from "react-bootstrap";
// import Sidebar from "../../Components/Sidebar";
// import Navbar from "../../Components/Navbar/Navbar";
// import axios from "axios";

// const RequirementsAndCaregiversPage = () => {
//   const getUserfromLocalStorage = localStorage.getItem("userDetails")
//     ? JSON.parse(localStorage.getItem("userDetails"))
//     : null;

//   const [profileData, setProfileData] = useState({
//     preffGender: "",
//     startDate: "",
//     endDate: "",
//     requirement: "",
//     caretakerId: "",
//   });

//   const [caretakers, setCaretakers] = useState([]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setProfileData({ ...profileData, [name]: value });
//   };

//   const handleRequirementsSave = async () => {
//     console.log("Frontend data", profileData);

//     const requirementProfileData = {
//       ...profileData,
//       userId: getUserfromLocalStorage.userId,
//       status: "pending",
//     };

//     try {
//       await axios.post(
//         "http://localhost:5000/api/requirement/insertRequirement",
//         requirementProfileData
//       );

//       setProfileData({
//         requirement: "",
//         preffGender: "",
//         startDate: "",
//         endDate: "",
//         caretakerId: "",
//       });
//       window.location.reload();
//     } catch (error) {
//       console.error("Error saving requirements:", error);
//     }
//   };

//   const handleSelectCaretaker = (caretakerId) => {
//     setProfileData({ ...profileData, caretakerId });
//   };

//   useEffect(() => {
//     const fetchCaretakers = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/requirement/getAllcaretakers"
//         );
//         const allCaretakers = response.data;

//         const userId = getUserfromLocalStorage.userId;
//         const filteredCaretakers = allCaretakers.filter(
//           (caretaker) => caretaker.userId === userId
//         );

//         setCaretakers(filteredCaretakers);
//       } catch (error) {
//         console.error("Error fetching caretakers:", error);
//       }
//     };

//     fetchCaretakers();

//   }, [getUserfromLocalStorage.userId]);

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar userType={getUserfromLocalStorage.userType} />
//       <div style={{ flex: 1 }}>
//         <Navbar />
//         <div className="mgd-main" style={{ padding: "20px" }}>
//           <Container fluid>
//             <Card className="mb-4">
//               <Card.Body>
//                 <h2 className="mb-4">Submit Your Service Request</h2>
//                 <Form>
//                   <Row>
//                     <Col>
//                       <Form.Group controlId="requirements">
//                         <Form.Label>Requirements</Form.Label>
//                         <Form.Control
//                           as="textarea"
//                           rows={3}
//                           name="requirement"
//                           value={profileData.requirement}
//                           onChange={handleInputChange}
//                           placeholder="Enter your service requirements..."
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col>
//                       <Form.Group controlId="preffGender">
//                         <Form.Label>Preferences</Form.Label>
//                         <Form.Select
//                           name="preffGender"
//                           value={profileData.preffGender}
//                           onChange={handleInputChange}
//                         >
//                           <option value="">Select Gender</option>
//                           <option value="male">Male</option>
//                           <option value="female">Female</option>
//                         </Form.Select>
//                       </Form.Group>

//                       <Dropdown onSelect={handleSelectCaretaker}>
//                         <Dropdown.Toggle
//                           variant="secondary"
//                           id="dropdown-basic"
//                         >
//                           Select caretaker
//                         </Dropdown.Toggle>
//                         <Dropdown.Menu>
//                           {caretakers.map((caretaker) => (
//                             <Dropdown.Item
//                               key={caretaker.caretakerId}
//                               eventKey={caretaker.caretakerId}
//                             >
//                               {`${caretaker.firstName} (${caretaker.caretakerId})`}
//                             </Dropdown.Item>
//                           ))}
//                         </Dropdown.Menu>
//                       </Dropdown>
//                     </Col>
//                   </Row>

//                   <Row>
//                     <Col>
//                       <Form.Group controlId="startDate">
//                         <Form.Label>Start Date</Form.Label>
//                         <Form.Control
//                           type="date"
//                           name="startDate"
//                           value={profileData.startDate}
//                           onChange={handleInputChange}
//                         />
//                       </Form.Group>
//                     </Col>
//                     <Col>
//                       <Form.Group controlId="endDate">
//                         <Form.Label>End Date</Form.Label>
//                         <Form.Control
//                           type="date"
//                           name="endDate"
//                           value={profileData.endDate}
//                           onChange={handleInputChange}
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Button
//                     variant="primary"
//                     type="button"
//                     onClick={handleRequirementsSave}
//                     style={{
//                       display: "block",
//                       marginLeft: "auto",
//                       marginRight: "auto",
//                       marginTop: "20px",
//                     }}
//                   >
//                     Submit Request
//                   </Button>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Container>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequirementsAndCaregiversPage;
