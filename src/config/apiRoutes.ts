
const API = {
    User: {
        RegisterCustomer: "/user/register",
        GetAllEmployees: "/employee/all",
        CreateAppointment: "/appointment/create",
        GetAvailableAppointmentTimes: "/appointment/available-times",
    },
    Employee:{
        GetAllAppointments: "/employee/appointment/all"
    },
    Admin: {
        RegisterEmployee: "/admin/register/employee",
        RegisterAdministrator: "/admin/register/administrator" 
    },
    Service:{
        GetAll: "/service/all",
        GetById: "/service"
    }
}

export default API