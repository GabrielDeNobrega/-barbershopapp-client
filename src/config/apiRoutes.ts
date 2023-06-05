
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
        RegisterAdministrator: "/admin/register/administrator",
        AppointmentReport: "/admin/report/appointments"
    },
    Service:{
        GetAll: "/service/all",
        GetAllPaginated: "/service/all/paginated",
        GetById: "/service",
        Create: "/service/add",
        ChangeActiveStatus: "/service/status/change"
    },
    Appointment: {
        ChangeStatus: "/appointment/status"
    },
}

export default API