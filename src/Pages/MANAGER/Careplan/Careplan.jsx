import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Typography, Paper, Box } from "@mui/material";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";

function appoinment() {
  const [appoinments, setappoinments] = useState([]);
  const [caretakerStatuses, setCaretakerStatuses] = useState({});

  useEffect(() => {
    async function fetchappoinments() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/appoinment/getappoinments",
        );
        setappoinments(response.data);
      } catch (error) {
        console.error("Error fetching care plans:", error);
      }
    }

    fetchappoinments();
  }, []);

  const getCaretakerStatus = async (caretakerId) => {
    try {
      const response = await axios.get(`/api/caretakers/${caretakerId}`);
      const caretaker = response.data;

      let status =
        caretaker.status === "available"
          ? "available"
          : caretaker.status === "onprocess"
            ? "onprocess"
            : "pending";

      setCaretakerStatuses((prevStatuses) => ({
        ...prevStatuses,
        [caretakerId]: status,
      }));
    } catch (error) {
      console.error(error.message);
      setCaretakerStatuses((prevStatuses) => ({
        ...prevStatuses,
        [caretakerId]: "Error fetching caretaker information",
      }));
    }
  };

  useEffect(() => {
    appoinments.forEach((appoinment) => {
      getCaretakerStatus(appoinment.caretakerId);
    });
  }, [appoinments]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <Container style={{ padding: "20px" }}>
          <Typography variant="h4" gutterBottom>
            Current Care Plans
          </Typography>
          {appoinments.map((appoinment) => (
            <Paper
              key={appoinment.appoinmentId}
              style={{ padding: "20px", marginBottom: "20px" }}
            >
              <Box>
                <Typography variant="h6">
                  Care Plan ID: {appoinment.appoinmentId}
                </Typography>
                <Table>
                  <tbody>
                    <tr>
                      <td>Caregiver:</td>
                      <td>
                        {appoinment.caregiverFirstName}{" "}
                        {appoinment.caregiverLastName}
                      </td>
                    </tr>
                    <tr>
                      <td>Caretaker:</td>
                      <td>
                        {appoinment.caretakerFirstName}{" "}
                        {appoinment.caretakerLastName}
                      </td>
                    </tr>
                    <tr>
                      <td>Started On:</td>
                      <td>
                        {new Date(appoinment.startDate).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr>
                      <td>Requirement:</td>
                      <td>{appoinment.instruction}</td>
                    </tr>
                    <tr>
                      <td>Caretaker Status:</td>
                      <td>{caretakerStatuses[appoinment.caretakerId]}</td>
                    </tr>
                  </tbody>
                </Table>
              </Box>
            </Paper>
          ))}
        </Container>
      </div>
    </div>
  );
}

export default appoinment;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Table, Typography, Paper, Box } from "@mui/material";
// import Sidebar from '../../../components/Sidebar/Sidebar';
// import Navbar from '../../../components/Navbar/Navbar';

// function appoinment() {
//   const [appoinments, setappoinments] = useState([]);
//   const [caretakerStatuses, setCaretakerStatuses] = useState({});
//   const getUserfromLocalStorage = localStorage.getItem("userProfile")
//     ? JSON.parse(localStorage.getItem("userProfile"))
//     : null;

//   useEffect(() => {
//     async function fetchappoinments() {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/appoinment/getappoinments"
//         );
//         setappoinments(response.data);
//       } catch (error) {
//         console.error("Error fetching care plans:", error);
//       }
//     }

//     fetchappoinments();
//   }, []);

//  const getCaretakerStatus = async (caretakerId) => {
//     try {
//       const response = await axios.get(`/api/caretakers/${caretakerId}`);
//       const caretaker = response.data;

//       let status =
//         caretaker.status === "Accepted"
//           ? "Accepted"
//           : caretaker.status === "Started"
//           ? "Started"
//           : "not assigned";

//       setCaretakerStatuses((prevStatuses) => ({
//         ...prevStatuses,
//         [caretakerId]: status,
//       }));
//     } catch (error) {
//       console.error(error.message);
//       setCaretakerStatuses((prevStatuses) => ({
//         ...prevStatuses,
//         [caretakerId]: "Error fetching caretaker information",
//       }));
//     }
//   };

//   useEffect(() => {
//     appoinments.forEach((appoinment) => {
//       getCaretakerStatus(appoinment.caretakerId);
//     });
//   }, [appoinments]);

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar />
//       <div style={{ flex: 1 }}>
//         <Navbar />
//         <Container style={{ padding: "20px" }}>
//           <Typography variant="h4" gutterBottom>
//             Current Care Plans
//           </Typography>
//           {appoinments.map((appoinment) => (
//             <Paper
//               key={appoinment.appoinmentId}
//               style={{ padding: "20px", marginBottom: "20px" }}
//             >
//               <Box>
//                 <Typography variant="h6">
//                   Care Plan ID: {appoinment.appoinmentId}
//                 </Typography>
//                 <Table>
//                   <tbody>
//                     <tr>
//                       <td>Caregiver:</td>
//                       <td>
//                         {appoinment.caregiverFirstName}{" "}
//                         {appoinment.caregiverLastName}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>Caretaker:</td>
//                       <td>
//                         {appoinment.caretakerFirstName}{" "}
//                         {appoinment.caretakerLastName}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>Started On:</td>
//                       <td>
//                         {new Date(appoinment.startDate).toLocaleDateString()}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td>Requirement:</td>
//                       <td>{appoinment.instruction}</td>
//                     </tr>
//                     <tr>
//                       <td>Caretaker Status:</td>
//                       <td>{caretakerStatuses[appoinment.caretakerId]}</td>
//                     </tr>
//                   </tbody>
//                 </Table>
//               </Box>
//             </Paper>
//           ))}
//         </Container>
//       </div>
//     </div>
//   );
// }

// export default appoinment;
