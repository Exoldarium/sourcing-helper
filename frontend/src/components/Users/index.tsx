import { logoutService } from '../../services/logout';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatchValue } from '../../contexts/Notification/useNotificationContext';
import { UserStyles } from './styles/UserStyles';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

const Users = () => {
  const { user } = useUser();
  const dispatch = useDispatchValue();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: () => logoutService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(['loggedUser'], null);
    },
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

  if (user) {
    return (
      <UserStyles>
        <Link to={'/'}>Home</Link>
        <div>{user.name}</div>
        <button onClick={logoutOnClick}>Logout</button >
      </UserStyles>
    );
  }
};

export { Users };