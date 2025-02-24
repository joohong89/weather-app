import {Container, Nav, Navbar} from "react-bootstrap";
import ThemeToggle from "./ThemeToggle.jsx";
import {Link} from "react-router";
import {IoHome} from "react-icons/io5";
import {FaChartBar} from "react-icons/fa";

const Navigation = () => {
    return (
        <Navbar>
            <Container>
                <Nav className="ms-auto d-flex">
                    <Nav.Link>
                        <Link to="/" className="btn theme-toggle-button text-decoration-none"><IoHome /></Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/dashboard" className="btn theme-toggle-button text-decoration-none"><FaChartBar  /></Link>
                    </Nav.Link>
                    <Nav.Link><ThemeToggle/></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
export default Navigation
