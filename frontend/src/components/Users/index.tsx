import { logoutService } from '../../services/logout';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { useMutation } from '@tanstack/react-query';
import { useDispatchValue } from '../../contexts/Notification/useNotificationContext';

const Users = () => {
  const { user, isLoading, error } = useUser();
  const dispatch = useDispatchValue();
  const navigate = useNavigate();

  console.log(user);

  const logoutMutation = useMutation({
    mutationFn: () => logoutService.logout(),
    onError: (err) => {
      console.log(err);
      dispatch({
        type: 'ERROR',
        payload: err.message
      });
    }
  });

  const logoutOnClick = () => {
    logoutMutation.mutate();
    navigate('/login');
  };

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <>
      <div>users</div>
      <button onClick={logoutOnClick}>Logout</button >
    </>
  );
};

export { Users };