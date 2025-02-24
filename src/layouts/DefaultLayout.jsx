import {Outlet} from "react-router";
import {Container} from "react-bootstrap";
import Navigation from "../components/Navigation.jsx";

const DefaultLayout = () => {
    return (
        <>
            <nav>
                <Navigation />
            </nav>
            <Container  className="p-4 p-sm-1">
                <main className="main p-2 p-md-5">
                    <Outlet />  {/* Content from routes goes here */}
                </main>
            </Container>
        </>
    )
}
export default DefaultLayout
