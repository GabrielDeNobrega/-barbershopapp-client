import { User } from "../User";

export interface FormUserModel {
    user: User
    confirmPassword: string
    confirmTermsOfService: boolean
}