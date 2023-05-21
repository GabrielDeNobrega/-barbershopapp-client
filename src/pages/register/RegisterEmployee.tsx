import { Role } from "../../models/UserCredentials"
import { registerEmployee } from "../../services/employeeService"
import UserRegister from "./UserRegister"

export const RegisterEmployee = () =>
  <UserRegister
    userType={Role.Employee}
    serviceCall={registerEmployee}
    whenCreatedRedirectTo="/admin"></UserRegister>
