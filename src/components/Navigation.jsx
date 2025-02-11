import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import ThemeToggle from "./ThemeToggle.jsx";

const Navigation = () => {
    return (
        <Navbar expand="sm">
            <Container>
                <Nav className="ms-auto">
                    <Nav.Link href="#home"><ThemeToggle/></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
export default Navigation
