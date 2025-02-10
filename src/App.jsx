import {RouterProvider} from "react-router";
import appRoute from "./AppRoutes.jsx";

function App() {

  return (
    <>
        <RouterProvider router={appRoute}></RouterProvider>
    </>
  )
}

export default App
