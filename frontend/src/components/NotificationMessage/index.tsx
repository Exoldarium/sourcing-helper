import { useEffect } from 'react';
import { useDispatchValue, useNotificationValue } from '../../contexts/Notification/useNotificationContext';

const NotificationMessage = () => {
  const notification = useNotificationValue();
  const dispatch = useDispatchValue();

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: 'CLEAR',
        payload: ''
      });
    }, 5000);
  }, [dispatch]);

  if (notification) {
    return (
      <div>
        <p style={{ color: 'red' }}>{notification.message}</p>
      </div>
    );
  }
};

export { NotificationMessage };