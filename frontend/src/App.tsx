import { useGetUsers } from './hooks/useGetUsers';

// TODO: move data fetching into a hook and add loading, error etc
const App = () => {
  const { error, loading, users } = useGetUsers();

  if (error) return <p>There was an error</p>;
  if (loading) return <p>Loading...</p>;
  if (!users) return null;

  console.log(loading);

  console.log(users);
  return (
    <div>Heloooo!</div>
  );
};

export { App };
