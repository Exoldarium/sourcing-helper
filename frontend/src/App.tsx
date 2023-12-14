import { useQuery } from '@tanstack/react-query';
import { services } from './services/users';

const App = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => services.getUsers()
  });

  if (error) return <p>There was an error</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return null;

  console.log(data);
  return (
    <div>Heloooo!</div>
  );
};

export { App };
