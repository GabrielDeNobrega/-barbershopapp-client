
const API = {
    User: {
        RegisterCustomer: "/user/register",
        GetAllEmployees: "/employee/all",
        CreateAppointment: "/appointment/create",
        GetAvailableAppointmentTimes: "/appointment/available-times",
        GetAllAppointments: "/user/appointments"
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
    },
    Appointment: {
        ChangeStatus: "/appointment/status"
    }
}

export default API