import { Settings } from "http2";
import { User } from "../User";

export interface FormUserModel {
    user: User
    confirmPassword: string
}