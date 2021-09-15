import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">Finding Falcone!</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="#reset">Reset</Nav.Link>
        <Nav.Link href="https://www.geektrust.in/">GeekTrust Home</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default Header;
