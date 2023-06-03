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
            text: 'Create a new administrator that will have maxim access to the system',
            title: 'Administrator Creation'
        },
        iconName: "add_moderator",
        navigateTo: '/admin/register/administrator',
        allowedRoles: [Role.Admin]
    },
    {
        buttonText: 'Go Manage Purchases',
        card: {
            text: 'Manage Purchases',
            title: 'Purchases'
        },
        iconName: "group_add",
        navigateTo: 'manage-purchases',
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