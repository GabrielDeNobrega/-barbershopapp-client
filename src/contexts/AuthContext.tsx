import * as React from 'react';
import { UserCredentials } from '../models/UserCredentials';
import authService from '../services/security/authService';


export const AuthContext = React.createContext<AuthContextType | null>(null);

export interface AuthContextType {
  user: UserCredentials | undefined ,
  setUser: React.Dispatch<React.SetStateAction<UserCredentials | undefined >>
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<UserCredentials | undefined>(authService.getAuthenticatedUser());

  return (
    <AuthContext.Provider value={{
      user,
      setUser
    }}>{children}</AuthContext.Provider>
  )
}

const useAuth = (): [UserCredentials | undefined , React.Dispatch<React.SetStateAction<UserCredentials | undefined >>] => {
  const { user, setUser } = React.useContext(AuthContext) as AuthContextType
  return [user, setUser];
}

export {
  AuthProvider,
  useAuth
}