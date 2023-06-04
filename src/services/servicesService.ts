import axios, { AxiosResponse } from 'axios';
import API from '../config/apiRoutes';
import { Service } from '../models/Service';
import { Page } from '../models/pagination/Page';

const getAllServices = async (): Promise<AxiosResponse<Array<Service>, any>> => {
    return await axios.get<Array<Service>>(API.Service.GetAll);
}

const getAllServicesPaged = async (pageNumber: number, pageSize: number = 10): Promise<AxiosResponse<Page<Service>, any>> => {
    return await axios.get<Page<Service>>(`${API.Service.GetAllPaginated}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

const getServiceById = async (serviceId: string): Promise<AxiosResponse<Service, any>> => {
    return await axios.get<Service>(`${API.Service.GetById}/${serviceId}`);
}

const createService = async (service: Service): Promise<AxiosResponse<Service, any>> => {
    return await axios.post<Service>(`${API.Service.Create}`, service);
}

const cahngeServiceStatus = async (serviceId: number): Promise<AxiosResponse<Service, any>> => {
    return await axios.put<Service>(`${API.Service.ChangeActiveStatus}/${serviceId}`);
}

export {
    getAllServices,
    getAllServicesPaged,
    getServiceById,
    createService,
    cahngeServiceStatus
};

