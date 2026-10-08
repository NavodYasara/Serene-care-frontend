import Sidebar from '../../components/Sidebar/Sidebar';
import { Container} from "react-bootstrap";

function AccDashboard() {

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Sidebar />
      </div>

      <div
        className="vh-100 d-flex "
        style={{ width: "100%", marginTop: "100px" }}
      >
        <Container>
        </Container>

      </div>
    </div>
  );
}

export default AccDashboard ;

