import axios, { AxiosResponse } from 'axios';
import { User } from '../models/User';
import API from '../config/apiRoutes';

const registerAdministrator = async (user: User): Promise<AxiosResponse<User, any>> => {
    return await axios.post<User>(API.Admin.RegisterAdministrator, user);
}

export {
    registerAdministrator
}