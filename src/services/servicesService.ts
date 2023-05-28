import axios, { AxiosResponse } from 'axios';
import API from '../config/apiRoutes';
import { Service } from '../models/Service';

const getAllServices = async (): Promise<AxiosResponse<Array<Service>, any>> => {
    return await axios.get<Array<Service>>(API.Service.GetAll);
}

const getServiceById = async (serviceId: string): Promise<AxiosResponse<Service, any>> => {
    return await axios.get<Service>(`${API.Service.GetById}/${serviceId}`);
}


export {
    getAllServices,
    getServiceById
};

