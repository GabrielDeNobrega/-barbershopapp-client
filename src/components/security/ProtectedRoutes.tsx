import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { Role } from '../../models/UserCredentials';
import { getFormattedPathName } from '../../utils/PathFormatter';

interface ProtectedRoutesProps {
  redirectTo: string
  allowedRoles?: Array<Role>
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ redirectTo, allowedRoles = [] }) => {
  const [user] = useAuth();

  const location = useLocation()
 
  const userHasOneOfAllowedRoles = (): boolean => {
    const userHasAnyAllowedRoles = allowedRoles.some(role => role === user?.role)
    if (!userHasAnyAllowedRoles) 
      toast.warning(`You do not have permission to access ${getFormattedPathName(location.pathname)} page`)
    
    return userHasAnyAllowedRoles;
  }

  return (allowedRoles.length ? userHasOneOfAllowedRoles() : user) && <Outlet /> || <Navigate to={redirectTo} />
}

export default ProtectedRoutes