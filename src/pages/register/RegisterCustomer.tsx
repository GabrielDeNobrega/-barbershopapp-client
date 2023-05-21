import { Role } from "../../models/UserCredentials"
import { registerCustomer } from "../../services/customerService"
import UserRegister from "./UserRegister"

export const RegisterCustomer = () =>
  <UserRegister
    userType={Role.Customer}
    serviceCall={registerCustomer}
    whenCreatedRedirectTo="/login"></UserRegister>