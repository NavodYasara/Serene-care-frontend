 import React from 'react';
import Sidebar from '../../Components/Sidebar'
import { Container, Table} from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Dropdown from 'react-bootstrap/Dropdown';



function CaretakerDashboard() {
    return (
        <div style={{ display: 'flex' }}>
            <div>
                <Sidebar/>
            </div>

            <div style={{marginLeft:'280px'}}>
                <Container fluid className="vh-100 d-flex " style={{width:'100%'}}>
                    <div className="flex-grow-2">
                        <div className="d-flex justify-content-center align-items-center h-100 " >
                            <div className="text-center p-5 shadow rounded">
                                <Avatar alt="Profile Picture" src="" sx={{ width: 100, height: 100, marginBottom: 20 }} />
                                <Table borderless className="invisible-table">
                                    <tbody>
                                        <tr>
                                            <td className="fw-bold">First Name:</td>
                                            <td>John</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Last Name:</td>
                                            <td>Doe</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Age:</td>
                                            <td>30</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Address:</td>
                                            <td>123 Main St, City</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Contact Number:</td>
                                            <td>123-456-7890</td>
                                        </tr>
                                        <tr>
                                            
                                            <Dropdown>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    Dropdown Button
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>

                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
);
}
export default CaretakerDashboard;