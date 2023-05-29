import { Service } from "./Service"
import { User } from "./User"

export interface Appointment {
    id: number
    start: string
    end: string
    customer: User
    employee: User
    service: Service
    createdAt: string
    active:boolean
}