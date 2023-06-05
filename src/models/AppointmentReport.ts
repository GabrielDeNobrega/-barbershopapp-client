import { Appointment } from "./Appointment";
import { Page } from "./pagination/Page";

export interface AppointmentReport {
    appointments: Page<Appointment>
    total: number
}