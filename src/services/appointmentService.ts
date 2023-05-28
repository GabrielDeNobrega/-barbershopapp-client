import axios, { AxiosResponse } from 'axios';
import API from '../config/apiRoutes';
import { FormAppointmentModel } from '../models/form/FormAppointmentModel';
import { Appointment } from '../models/Appointment';
import { AppointmentTime } from '../models/AppointmentTime';

const createAppointment = async ({appointment}: FormAppointmentModel): Promise<AxiosResponse<Appointment, any>> => {
    return await axios.post<Appointment>(API.User.CreateAppointment, appointment);
}

const getAvailableAppointmentTimes = async (employeeId:number, day:string): Promise<AxiosResponse<Array<AppointmentTime>, any>> => {
    return await axios.get<Array<AppointmentTime>>(`${API.User.GetAvailableAppointmentTimes}/${employeeId}/${day}`);
}

export {
    createAppointment,
    getAvailableAppointmentTimes
};

