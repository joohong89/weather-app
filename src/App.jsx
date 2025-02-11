import {RouterProvider} from "react-router";
import appRoute from "./AppRoutes.jsx";
import {ThemeProvider} from "./context/ThemeContext.jsx";
import Navigation from "./components/Navigation.jsx";
import {ToastProvider} from "./context/ToastContext.jsx";

function App() {

  return (
    <>
        <ThemeProvider>
            <ToastProvider>
                <nav>
                    <Navigation />
                </nav>
                <RouterProvider router={appRoute}></RouterProvider>
            </ToastProvider>
        </ThemeProvider>
    </>
  )
}

export default App
