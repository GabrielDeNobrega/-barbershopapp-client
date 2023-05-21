import { Role } from "../../models/UserCredentials"
import { registerAdministrator } from "../../services/administratorService"
import UserRegister from "./UserRegister"

export const RegisterAdministrator = () =>
    <UserRegister
        userType={Role.Admin}
        serviceCall={registerAdministrator}
        whenCreatedRedirectTo="/admin"></UserRegister>
