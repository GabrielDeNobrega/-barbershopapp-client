import { Role } from "./UserCredentials";

export interface MenuItem {
    buttonText: string;
    card: {
        text: string;
        title: string;
    }
    iconName: string;
    navigateTo: string;
    allowedRoles: Array<Role>
}