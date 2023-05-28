import axios from 'axios';
import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import authService from '../../services/security/authService';

interface AuthInterceptorProps {
    children: ReactNode
}
export const AuthInterceptor: React.FC<AuthInterceptorProps> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useAuth();

    useEffect(() => {
        axios.interceptors.response.use((response) => response
            , (error) => {
                if (error.request.status === 401) {
                    authService.removeToken();
                    authService.removeAuthenticatedUser();
                    setUser(undefined);
                    navigate("/login");
                }
                return Promise.reject(error);
            });
    }, [])
    return (
        <>{children}</>
    )
}