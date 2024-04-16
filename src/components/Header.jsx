import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <Navbar expand="lg" className="bg-success w-100">
      <Container fluid>
        <h2>Indicadores Económicos de Chile</h2>
      </Container>
    </Navbar>
  );
};

export default Header;
