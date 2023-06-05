import axios, { AxiosResponse } from 'axios';
import API from '../config/apiRoutes';
import { axiosNoAuth } from '../config/axiosConfig';
import { User } from '../models/User';
import { Page } from '../models/pagination/Page';
import { Appointment } from '../models/Appointment';

const registerCustomer = async (user: User): Promise<AxiosResponse<User, any>> => {
    return await axiosNoAuth().post<User>(API.User.RegisterCustomer, user);
}

const getAppointmentsHistory = async (pageNumber: number, pageSize: number = 10): Promise<AxiosResponse<Page<Appointment>, any>> => {
    return await axios.get<Page<Appointment>>(`${API.User.GetAllAppointments}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

export {
    registerCustomer,
    getAppointmentsHistory
};
