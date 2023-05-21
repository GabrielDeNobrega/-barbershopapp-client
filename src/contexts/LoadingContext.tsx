import * as React from 'react';


export const LoadingContext = React.createContext<LoadingContextType | null>(null);

export interface LoadingContextType {
  loading: boolean,
  isLoading: React.Dispatch<React.SetStateAction<boolean>>
}

interface LoadingProviderProps {
  children: React.ReactNode
}

const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, isLoading] = React.useState(false);

  return (
    <LoadingContext.Provider value={{
      loading,
      isLoading
    }}>{children}</LoadingContext.Provider>
  )
}

const useLoading = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const { loading, isLoading } = React.useContext(LoadingContext) as LoadingContextType
  return [loading, isLoading];
}

export {
  LoadingProvider,
  useLoading
}