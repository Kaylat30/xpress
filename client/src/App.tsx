import { Route, createBrowserRouter, createRoutesFromElements,RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./components/Layout"
import Error from "./components/Error"
import { Dashboard } from "./pages/Dashboard"
import Analysis from "./pages/Analysis"
import Clients from "./pages/Clients"
import Deliveries from "./pages/Deliveries"
import Login from "./pages/Login"
import Settings from "./pages/Settings"
import Staff from "./pages/Staff"
import LayoutCashier from "./components/LayoutCashier";
import LayoutDriver from "./components/LayoutDriver";
import DashboardDriver from "./pages/DashboardDriver";
import DashboardCashier from "./pages/DashboardCashier";

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="login" element={<Login/>}/>
    <Route path="/admin" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Dashboard />}/>
      <Route path="analysis" element={<Analysis/>}/>
      <Route path="clients" element={<Clients />}/>
      <Route path="deliveries" element={<Deliveries/>}/>
      <Route path="settings" element={<Settings/>}/>
      <Route path="staff" element={<Staff/>}/>
    </Route>
    <Route path="/cashier" element={<LayoutCashier />} errorElement={<Error />}>
      <Route index element={<DashboardCashier />}/>
      <Route path="settings" element={<Settings/>}/>
    </Route>
    <Route path="/driver" element={<LayoutDriver />} errorElement={<Error />}>
      <Route index element={<DashboardDriver />}/>
      <Route path="settings" element={<Settings/>}/>
    </Route> 
  </Route>  
))
function App():JSX.Element{
  

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />      
    </>
  )
}

export default App
