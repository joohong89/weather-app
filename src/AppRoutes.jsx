import {createBrowserRouter} from "react-router";
import DefaultLayout from "./layouts/DefaultLayout.jsx";
import CurrentWeather from "./modules/weather/views/CurrentWeather.jsx";
import PageNotFound from "./views/error/PageNotFound.jsx";
import ForecastWeather from "./modules/weather/views/ForecastWeather.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Dashboard from "./modules/dashboard/views/Dashboard.jsx";

const appRoute = createBrowserRouter([
    {
        element: <DefaultLayout/>,
        children: [
            { path: "/", element: <CurrentWeather/> },
            { path: "/forecast/:lat/:lon", element: <ForecastWeather/> },
        ]
    },
    {
        element: <DashboardLayout/>,
        path: "/dashboard",
        children: [
            { path: "", element: <Dashboard/> }
        ]
    },
    { path: "*", element: <PageNotFound/> }, // Catch-all for 404

]);

export default appRoute;