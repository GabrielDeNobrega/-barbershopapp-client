import { UserCredentials } from "../../models/UserCredentials";
import { encodeBase64, decodeBase64 } from '../../utils/Encoder';


export const setToken = (token: string) => {
    localStorage.setItem('token', encodeBase64(token))
}

export const getToken = (): string => {
    const token = localStorage.getItem('token')
    return token ? decodeBase64(token) : ''
}

export const removeToken = () => {
    const token = localStorage.getItem('token')
    if (token) localStorage.removeItem('token');
}

export const setUser = (user: UserCredentials) => {
    localStorage.setItem('user', encodeBase64(JSON.stringify(user)))
}

export const getUser = (): UserCredentials => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(decodeBase64(user)) : null
}

export const removeUser = () => {
    const user = localStorage.getItem('user')
    if (user) localStorage.removeItem('user');
}

export default {
    setToken,
    getToken,
    removeToken,
    setUser,
    getUser,
    removeUser
}
