import { Route, createBrowserRouter, createRoutesFromElements,RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "./components/Layout"
import Error from "./components/Error"
import { Home } from "./pages/Home"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />} errorElement={<Error />}>
    <Route index element={<Home />}/>
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
