export interface FormAppointmentModel {
    appointment: {
        start: string
        end: string
        employee: FormModelId
        service: FormModelId
    }
    date: string,
    time: string
}

interface FormModelId {
    id: number
}
