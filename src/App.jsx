import {
  createBrowserRouter,
  RouterProvider,
} from "react-router"
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
// Layouts
import Main, { mainLoader } from "./layouts/Main";
//Actions
import { logoutAction } from "./actions/logout";
// Library
import {ToastContainer} from 'react-toastify'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    loader: mainLoader,
    errorElement: <Error/>,
    children: [
       {
    index: true,
    element: <Dashboard/>,
    loader: dashboardLoader,
    errorElement: <Error/>    
  },
  {
    path: "logout",
    action: logoutAction
  }
    ]    
  },
 
]);

function App() {
  

  return (
    <>
        <div className="App">
          <RouterProvider router={router} />,
          <ToastContainer/>
        </div>
    </>
  )
}

export default App
