import { useContext } from 'react';
import { NotificationContext } from './NotificationProvider';

const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);

  return notificationAndDispatch.state;
};

const useDispatchValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);

  return notificationAndDispatch.dispatch;
};

export {
  useNotificationValue,
  useDispatchValue
};