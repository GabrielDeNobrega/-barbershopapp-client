import axios, { AxiosResponse } from 'axios';
import API from '../config/apiRoutes';
import { AppointmentReport } from '../models/AppointmentReport';
import { FilterReport } from '../models/form/FilterReport';

const getAppointmentReport = async (pageNumber: number, pageSize: number = 10, { startDate, endDate }: FilterReport): Promise<AxiosResponse<AppointmentReport, any>> => {
    return await axios.get<AppointmentReport>(`${API.Admin.AppointmentReport}?pageNumber=${pageNumber}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`);
}

export {
    getAppointmentReport
};

