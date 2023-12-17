import { Dispatch, ReactNode, useReducer } from 'react';
import { createContext } from 'react';
import { NotificationAction, NotificationState, notificationReducer } from '../../reducers/notificationReducer';

export interface NotificationContextType {
  state: NotificationState;
  dispatch: Dispatch<NotificationAction>
}

export interface Props {
  children: ReactNode;
}

const NotificationContext = createContext<NotificationContextType>({} as NotificationContextType);

const NotificationContextProvider = ({ children }: Props) => {
  const initialState: NotificationState = {
    message: ''
  };

  const [state, dispatch] = useReducer(notificationReducer, initialState);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export {
  NotificationContextProvider,
  NotificationContext
};