import { Route, Routes } from 'react-router-dom'
import Header from '../components/commons/Header'
import ProtectedRoutes from '../components/security/ProtectedRoutes'
import { Role } from '../models/UserCredentials'
import LandingPage from '../pages/LandingPage'
import AdminHome from '../pages/admin/AdminHome'
import ServiceCreation from '../pages/admin/serviceManager/ServiceCreation'
import { CustomerHome } from '../pages/customer/CustomerHome'
import CustomerAppointmentHistory from '../pages/customer/appointment/CustomerAppointmentHistory'
import ScheduleAppointment from '../pages/customer/appointment/ScheduleAppointment'
import AppointmentsReceptionHistory from '../pages/employee/AppointmentsReceptionHistory'
import { EmployeeHome } from '../pages/employee/EmployeeHome'
import Login from '../pages/login/Login'
import NotFound from '../pages/notFound/NotFound'
import { RegisterAdministrator } from '../pages/register/RegisterAdministrator'
import { RegisterCustomer } from '../pages/register/RegisterCustomer'
import { RegisterEmployee } from '../pages/register/RegisterEmployee'
import ServiceList from '../pages/admin/serviceManager/ServiceList'
import AppointmentReport from '../pages/admin/report/AppointmentReportPage'

const AppRouter = () => {
    return (
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
                    <Route path="register/employee" element={<RegisterEmployee />}></Route>
                    <Route path="register/administrator" element={<RegisterAdministrator />}></Route>
                    <Route path="service/creation" element={<ServiceCreation />}></Route>
                    <Route path="service/list" element={<ServiceList />}></Route>
                    <Route path="report/appointment" element={<AppointmentReport/>}></Route>

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
    )
}

export default AppRouter