import {Outlet} from "react-router";
import {Container} from "react-bootstrap";

const DefaultLayout = () => {
    return (
        <Container>
            <main className="main p-2 p-md-5">
                <Outlet />  {/* Content from routes goes here */}
            </main>
        </Container>
    )
}
export default DefaultLayout
