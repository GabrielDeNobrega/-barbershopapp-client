export interface UserCredentials {
    id: string
    email: string
    password?: string
    username: string
    role: Role
}

export enum Role {
    Admin = "Administrator",
    Employee = "Employee",
    Customer = "Customer"
}

const isAdmin = (user: UserCredentials | undefined) => lowerCase(user?.role) === lowerCase(Role.Admin)
const isEmployee = (user: UserCredentials | undefined) => lowerCase(user?.role) === lowerCase(Role.Employee)
const isCustomer = (user: UserCredentials | undefined) => lowerCase(user?.role) === lowerCase(Role.Customer)
const userIs = (user: UserCredentials | undefined, role: Role) => lowerCase(user?.role) === lowerCase(role)

const lowerCase = (value?:any) => value?.toLocaleLowerCase()

export {
    isAdmin,    
    isCustomer,
    isEmployee,
    userIs
}