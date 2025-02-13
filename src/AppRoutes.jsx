import {createBrowserRouter} from "react-router";
import DefaultLayout from "./layouts/DefaultLayout.jsx";
import CurrentWeather from "./views/CurrentWeather.jsx";
import PageNotFound from "./views/error/PageNotFound.jsx";
import ForecastWeather from "./views/ForecastWeather.jsx";

const appRoute = createBrowserRouter([
    {
        element: <DefaultLayout/>,
        children: [
            { path: "/", element: <CurrentWeather/> },
            { path: "/forecast/:lat/:lon", element: <ForecastWeather/> },
        ]
    },
    { path: "*", element: <PageNotFound/> }, // Catch-all for 404

]);

export default appRoute;