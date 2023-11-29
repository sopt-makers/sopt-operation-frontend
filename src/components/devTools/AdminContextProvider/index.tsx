import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

interface Props {
  children: ReactNode;
}

interface AdminStatusContextType {
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
}

const defaultContextValue: AdminStatusContextType = {
  status: 'DEVELOPER',
  setStatus: () => {},
};

export const adminStatusContext =
  createContext<AdminStatusContextType>(defaultContextValue);

export const AdminStatusProvider = (props: Props) => {
  const { children } = props;
  const [status, setStatus] = useState('DEVELOPER');

  return (
    <adminStatusContext.Provider value={{ status, setStatus }}>
      {children}
    </adminStatusContext.Provider>
  );
};
