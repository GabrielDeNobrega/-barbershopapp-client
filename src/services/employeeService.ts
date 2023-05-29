import axios, { AxiosResponse } from 'axios';
import API from '../config/apiRoutes';
import { Employee } from '../models/Employee';
import { User } from '../models/User';
import { Appointment } from '../models/Appointment';
import { Page } from '../models/pagination/Page';

const registerEmployee = async (user: User): Promise<AxiosResponse<User, any>> => {
    return await axios.post<User>(API.Admin.RegisterEmployee, user);
}

const getAllEmployee = async (): Promise<AxiosResponse<Array<Employee>, any>> => {
    return await axios.get<Array<Employee>>(API.User.GetAllEmployees);
}

const getAllEmployeeAppointments = async (pageNumber: number, pageSize: number = 10): Promise<AxiosResponse<Page<Appointment>, any>> => {
    return await axios.get<Page<Appointment>>(`${API.Employee.GetAllAppointments}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

export {
    getAllEmployee,
    registerEmployee,
    getAllEmployeeAppointments
};

