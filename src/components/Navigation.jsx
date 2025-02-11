import {Container, Nav, Navbar} from "react-bootstrap";
import ThemeToggle from "./ThemeToggle.jsx";

const Navigation = () => {
    return (
        <Navbar expand="sm">
            <Container>
                <Nav className="ms-auto">
                    <Nav.Link><ThemeToggle/></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
export default Navigation
