import { Route, Routes } from "react-router"
import { ToastContainer } from "react-toastify"
import Header from "./components/commons/Header"
import Loading from "./components/commons/Loading"
import Footer from "./components/footer/Footer"
import ProtectedRoutes from "./components/security/ProtectedRoutes"
import { Role } from "./models/UserCredentials"
import LandingPage from "./pages/LandingPage"
import AdminHome from "./pages/admin/AdminHome"
import { CustomerHome } from "./pages/customer/CustomerHome"
import ScheduleAppointment from "./pages/customer/appointment/ScheduleAppointment"
import AppointmentsReceptionHistory from "./pages/employee/AppointmentsReceptionHistory"
import { EmployeeHome } from "./pages/employee/EmployeeHome"
import Login from "./pages/login/Login"
import NotFound from "./pages/notFound/NotFound"
import { RegisterAdministrator } from "./pages/register/RegisterAdministrator"
import { RegisterCustomer } from "./pages/register/RegisterCustomer"
import { RegisterEmployee } from "./pages/register/RegisterEmployee"
import CustomerAppointmentHistory from "./pages/customer/appointment/CustomerAppointmentHistory"

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
              <Route path="appointment/history" element={<CustomerAppointmentHistory />}></Route>
            </Route>

            <Route path="/admin" element={<ProtectedRoutes allowedRoles={[Role.Admin]} redirectTo="/" />}>
              <Route index element={<AdminHome />}></Route>
              <Route path="/admin/register/employee" element={<RegisterEmployee />}></Route>
              <Route path="/admin/register/administrator" element={<RegisterAdministrator />}></Route>
            </Route>

            <Route path="/employee" element={<ProtectedRoutes allowedRoles={[Role.Employee]} redirectTo="/" />}>
              <Route>
                <Route index element={<EmployeeHome />}></Route>
                <Route path="appointment/reception-history" element={<AppointmentsReceptionHistory />}></Route>
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