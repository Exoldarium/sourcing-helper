import { useEffect } from 'react';
import { useDispatchValue, useNotificationValue } from '../../contexts/Notification/useNotificationContext';

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
      <div>
        <p style={{ color: 'red' }}>{notification.message}</p>
      </div>
    );
  }
};

export { NotificationMessage };