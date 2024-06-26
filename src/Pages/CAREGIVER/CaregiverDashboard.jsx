import React from "react";
import Sidebar from "../../Components/Sidebar";
import { Container, Grid, Typography, Paper } from "@mui/material";

function CaregiverDashboard() {
  // Sample data for upcoming appointments
  const upcomingAppointments = [
    { id: 1, patient: "John Doe", date: "2024-05-10", time: "10:00 AM" },
    { id: 2, patient: "Jane Smith", date: "2024-05-12", time: "02:00 PM" },
    // Add more sample appointments as needed
  ];

  // Sample data for assigned caretakers
  const assignedCaretakers = [
    { id: 1, name: "Alice Johnson", specialty: "Elderly Care" },
    { id: 2, name: "Bob Smith", specialty: "Special Needs Care" },
    // Add more sample caretakers as needed
  ];

  // Sample data for tasks
  const tasks = [
    { id: 1, description: "Assist with medication", status: "Pending" },
    { id: 2, description: "Prepare meals", status: "Completed" },
    // Add more sample tasks as needed
  ];

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Sidebar />
      </div>

      <div
        fluid
        className="vh-100 d-flex "
        style={{ width: "100%", marginTop: "100px" }}
      >
        <Container>
          <Grid container spacing={3}>
            {/* Upcoming Appointments */}
            <Grid item xs={12}>
              <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h5" gutterBottom>
                  Upcoming Appointments
                </Typography>
                <ul>
                  {upcomingAppointments.map((appointment) => (
                    <li key={appointment.id}>
                      {appointment.patient} - {appointment.date}{" "}
                      {appointment.time}
                    </li>
                  ))}
                </ul>
              </Paper>
            </Grid>

            {/* Assigned Caretakers */}
            <Grid item xs={12}>
              <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h5" gutterBottom>
                  Assigned Caretakers
                </Typography>
                <ul>
                  {assignedCaretakers.map((caretaker) => (
                    <li key={caretaker.id}>
                      {caretaker.name} - {caretaker.specialty}
                    </li>
                  ))}
                </ul>
              </Paper>
            </Grid>

            {/* Tasks */}
            <Grid item xs={12}>
              <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h5" gutterBottom>
                  Tasks
                </Typography>
                <ul>
                  {tasks.map((task) => (
                    <li key={task.id}>
                      {task.description} - Status: {task.status}
                    </li>
                  ))}
                </ul>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default CaregiverDashboard;
