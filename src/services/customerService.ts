import { AxiosResponse } from 'axios';
import API from '../config/apiRoutes';
import { axiosNoAuth } from '../config/axiosConfig';
import { User } from '../models/User';

const registerCustomer = async (user: User): Promise<AxiosResponse<User, any>> => {
    return await axiosNoAuth().post<User>(API.User.RegisterCustomer, user);
}

export {
    registerCustomer
};
