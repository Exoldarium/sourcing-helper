import { useQuery } from '@tanstack/react-query';
import { services } from '../../services/users';
import { logoutService } from '../../services/logout';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => services.getUsers()
  });
  const navigate = useNavigate();

  if (error) return <p>There was an error</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return null;

  console.log(data);
  const logoutOnClick = () => {
    void logoutService.logout();
    navigate('/login');

  };

  return (
    <>
      <div>users</div>
      <button onClick={logoutOnClick}>Logout</button >
    </>
  );
};

export { Users };