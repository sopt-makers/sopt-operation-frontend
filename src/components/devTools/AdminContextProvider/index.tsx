import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

interface Props {
  children: ReactNode;
}

interface AdminStatusContextType {
  status: string | null;
  setStatus: Dispatch<SetStateAction<string | null>>;
}

const defaultContextValue: AdminStatusContextType = {
  status: 'DEVELOPER',
  setStatus: () => {},
};

export const adminStatusContext =
  createContext<AdminStatusContextType>(defaultContextValue);

export const AdminStatusProvider = (props: Props) => {
  const { children } = props;
  const [status, setStatus] = useState<string | null>('NOT_CERTIFIED');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedStatus =
        sessionStorage.getItem('adminStatus') ?? 'NOT_CERTIFIED';
      setStatus(savedStatus);
    }
  }, []);

  return (
    <adminStatusContext.Provider value={{ status, setStatus }}>
      {children}
    </adminStatusContext.Provider>
  );
};
