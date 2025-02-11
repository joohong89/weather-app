import {Container} from "react-bootstrap";
import {Link} from "react-router";

const PageNotFound = () => {
    return (
        <Container className="pageNotFound" fluid>
            <div className="page-not-found d-flex flex-column align-items-center">
                <img src="/images/11.png" width="300" alt="Not found image"/>
                <span>Oops, page is not found</span>
                <Link to={'/'} className="return-link">Back</Link>
            </div>
        </Container>

    )
}
export default PageNotFound
