import { MenuItem } from "../../../models/MenuItem";
import { Role } from "../../../models/UserCredentials";

const adminMenuItems = [
    {
        buttonText: 'Create a Employee',
        card: {
            text: 'Create a Employee to start work on BarberShop!',
            title: 'Employee Creation'
        },
        iconName: "engineering",
        navigateTo: '/admin/register/employee',
        allowedRoles: [Role.Admin]
    },
    {
        buttonText: 'Create a Administrator',
        card: {
            text: 'Create a new administrator that will have maximum access to the system',
            title: 'Administrator Creation'
        },
        iconName: "add_moderator",
        navigateTo: '/admin/register/administrator',
        allowedRoles: [Role.Admin]
    },
    {
        buttonText: 'Service Creation',
        card: {
            text: 'Creates a new Service',
            title: 'Service Creation'
        },
        iconName: "design_services",
        navigateTo: '/admin/service/creation',
        allowedRoles: [Role.Admin]
    },
    {
        buttonText: 'Service List',
        card: {
            text: 'See All Created Services ',
            title: 'Service List'
        },
        iconName: "receipt_long",
        navigateTo: '/admin/service/list',
        allowedRoles: [Role.Admin]
    },
    {
        buttonText: 'Appointments Report',
        card: {
            text: 'Report of All Appointments',
            title: 'Appointments Report'
        },
        iconName: "analytics",
        navigateTo: '/admin/report/appointment',
        allowedRoles: [Role.Admin]
    },
];

const customerMenuItems = [
    {
        buttonText: 'Schedule an Appointment',
        card: {
            text: 'Schedule an Appointment',
            title: 'Appointment'
        },
        iconName: "schedule",
        navigateTo: '/customer/appointment/schedule',
        allowedRoles: [Role.Customer]
    },
    {
        buttonText: 'Appointments History',
        card: {
            text: 'See your scheduled Appointments',
            title: 'Appointments History'
        },
        iconName: "history",
        navigateTo: '/customer/appointment/history',
        allowedRoles: [Role.Customer]
    },
];

const employeeMenuItems = [
    {
        buttonText: 'Appointments',
        card: {
            text: 'See all your performed and ongoing appointments',
            title: 'Performed/Ongoing Appointments'
        },
        iconName: "home_repair_service",
        navigateTo: '/employee/appointment/reception-history',
        allowedRoles: [Role.Employee]
    },
];

export const MenuItems: Array<MenuItem> = [
    ...adminMenuItems,
    ...customerMenuItems,
    ...employeeMenuItems
]