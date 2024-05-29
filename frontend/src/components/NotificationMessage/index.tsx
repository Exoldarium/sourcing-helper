import { useEffect } from 'react';
import { useDispatchValue, useNotificationValue } from '../../hooks/useNotificationContext';
import { NotificationMessageStyles } from './styles/NotificationMessageStyles';

const NotificationMessage = () => {
  const notification = useNotificationValue();
  const dispatch = useDispatchValue();

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
          payload: ''
        });
      }, 5000);
    }
  }, [dispatch, notification]);

  if (notification) {
    return (
      <NotificationMessageStyles $notification={notification}>
        <p>{notification.message}</p>
      </NotificationMessageStyles>
    );
  }
};

export { NotificationMessage };