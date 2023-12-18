import { useQuery } from '@tanstack/react-query';
import { roleService } from '../../services/roles';

const Roles = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['roles'],
    queryFn: () => roleService.getRoles()
  });

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return null;

  return (
    <ul>
      {data.map(role => (
        <li key={role.role_id}>{role.role_name}</li>
      ))}
    </ul>
  );
};

export { Roles };