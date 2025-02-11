import {RouterProvider} from "react-router";
import appRoute from "./AppRoutes.jsx";
import {ThemeProvider} from "./context/ThemeContext.jsx";
import Navigation from "./components/Navigation.jsx";

function App() {

  return (
    <>
        <ThemeProvider>
            <nav>
                <Navigation />
            </nav>
            <RouterProvider router={appRoute}></RouterProvider>
        </ThemeProvider>
    </>
  )
}

export default App
