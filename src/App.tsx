import { Button } from "react-bootstrap"
import Home from "./pages/Home"
import LandingPage from "./pages/LandingPage"
import Header from "./components/commons/Header"
import React from "react"
import Footer from "./components/footer/Footer"
import Login from "./pages/login/Login"
import { ToastContainer } from "react-toastify"
import Loading from "./components/commons/Loading"
import { Route, Routes } from "react-router"
import AdminHome from "./pages/admin/AdminHome"
import ProtectedRoutes from "./components/security/ProtectedRoutes"
import { Role } from "./models/UserCredentials"
import NotFound from "./pages/notFound/NotFound"
import { RegisterEmployee } from "./pages/register/RegisterEmployee"
import { RegisterCustomer } from "./pages/register/RegisterCustomer"
import { RegisterAdministrator } from "./pages/register/RegisterAdministrator"
import { CustomerHome } from "./pages/customer/CustomerHome"
import { EmployeeHome } from "./pages/employee/EmployeeHome"
import ScheduleAppointment from "./pages/customer/appointment/ScheduleAppointment"

const App = () => {
  return (
    <>
      <div className="body">
        <Loading />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />

        <Routes>
          <Route element={<Header />}>
            <Route path="/">
              <Route index element={<LandingPage />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register/customer' element={<RegisterCustomer />}></Route>
            </Route>

            <Route path="/customer" element={<ProtectedRoutes allowedRoles={[Role.Customer]} redirectTo="/" />}>
              <Route index element={<CustomerHome />}></Route>
              <Route path="appointment/schedule" element={<ScheduleAppointment />}></Route>
            </Route>

            <Route path="/admin" element={<ProtectedRoutes allowedRoles={[Role.Admin]} redirectTo="/" />}>
              <Route index element={<AdminHome />}></Route>
              <Route path="/admin/register/employee" element={<RegisterEmployee />}></Route>
              <Route path="/admin/register/administrator" element={<RegisterAdministrator />}></Route>
            </Route>

            <Route path="/employee" element={<ProtectedRoutes allowedRoles={[Role.Employee]} redirectTo="/" />}>
              <Route>
                <Route index element={<EmployeeHome />}></Route>
              </Route>
            </Route>
            <Route path='*' element={<NotFound message='Page Not Found' />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App