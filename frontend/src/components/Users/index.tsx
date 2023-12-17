import { logoutService } from '../../services/logout';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { useMutation } from '@tanstack/react-query';
import { useDispatchValue } from '../../contexts/Notification/useNotificationContext';
import { useEffect, useState } from 'react';
import { parseRegularUserData } from '../../utils/parseRegularUserData';
import { LoggedUser } from '../../types';

const Users = () => {
  const { user, isLoading, error } = useUser();
  const [loggedUser, setLoggedUser] = useState<LoggedUser>();
  const dispatch = useDispatchValue();
  const navigate = useNavigate();


  useEffect(() => {
    const userFromStorage = localStorage.getItem('loggedUser');

    if (userFromStorage) {
      const parsedUser = JSON.parse(userFromStorage) as unknown;
      const userToSet = parseRegularUserData.toLoginEntry(parsedUser);

      setLoggedUser(userToSet);
    }
  }, []);

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
    localStorage.removeItem('loggedUser');
    navigate('/login');
  };

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <>
      <nav>
        <div>{loggedUser?.name} logged in</div>
        <button onClick={logoutOnClick}>Logout</button >
      </nav>
    </>
  );
};

export { Users };