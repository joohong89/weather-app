import {Outlet} from "react-router";
import Navigation from "../components/Navigation.jsx";

const DashboardLayout = () => {
    return (
        <>
            <nav>
                <Navigation />
            </nav>
            <div className="px-5">
                <Outlet />
            </div>
        </>

    )
}
export default DashboardLayout
