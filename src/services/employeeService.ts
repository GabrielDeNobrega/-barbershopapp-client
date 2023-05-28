import axios, { AxiosResponse } from 'axios';
import API from '../config/apiRoutes';
import { Employee } from '../models/Employee';
import { User } from '../models/User';

const registerEmployee = async (user: User): Promise<AxiosResponse<User, any>> => {
    return await axios.post<User>(API.Admin.RegisterEmployee, user);
}

const getAllEmployee = async (): Promise<AxiosResponse<Array<Employee>, any>> => {
    return await axios.get<Array<Employee>>(API.User.GetAllEmployees);
}

export {
    getAllEmployee, registerEmployee
};

