import axios, { AxiosResponse } from 'axios';
import { User } from '../models/User';
import API from '../config/apiRoutes';

const registerEmployee = async (user: User): Promise<AxiosResponse<User, any>> => {
    return await axios.post<User>(API.Admin.RegisterEmployee, user);
}

export {
    registerEmployee
}