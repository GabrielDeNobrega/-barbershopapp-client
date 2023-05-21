import { AxiosResponse } from 'axios';
import { axiosNoAuth, setDefaultAxiosAuthToken } from '../../config/axiosConfig';
import { AuthCredentials } from '../../models/AuthCredentials';
import { LoginModel } from '../../models/LoginModel';
import { UserCredentials } from '../../models/UserCredentials';
import storageService from '../local-storage/localStorageService';

const authenticate = async ( user: LoginModel): Promise<AxiosResponse<AuthCredentials, any>> => {
    return await axiosNoAuth().post<AuthCredentials>('/auth/authenticate', user);
}

const setToken = (token:string) =>{
    storageService.setToken(token);
    setDefaultAxiosAuthToken(token);
}

const setAuthenticatedUser = (user:UserCredentials) => storageService.setUser(user);

const getAuthenticatedUser = (): UserCredentials | undefined => storageService.getUser();

const removeToken = () =>{
    storageService.removeToken();
    setDefaultAxiosAuthToken('');
}

const removeAuthenticatedUser = () => storageService.removeUser()

export default  {
    authenticate,
    setToken,
    removeToken,
    setAuthenticatedUser,
    getAuthenticatedUser,
    removeAuthenticatedUser
}