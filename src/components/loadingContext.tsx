import { createContext, useContext, useState, PropsWithChildren } from 'react';

interface LoadingContextType {
  loadingShown: boolean;
  setLoadingShown: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  loadingShown: false,
  setLoadingShown: () => {},
});

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [loadingShown, setLoadingShown] = useState(false);

  return (
    <LoadingContext.Provider value={{ loadingShown, setLoadingShown }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
