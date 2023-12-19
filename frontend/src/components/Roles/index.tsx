import { useQuery } from '@tanstack/react-query';
import { roleService } from '../../services/roles';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { NewRole } from './NewRole';

const Roles = () => {
  const [newRole, setNewRole] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ['roles'],
    queryFn: () => roleService.getRoles()
  });

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return null;

  console.log(data);

  return (
    <>
      <ul>
        {data.map(role => (
          <li key={role.role_id}>
            <Link to={`/${role.role_id}`}>
              {role.role_name}
            </Link>
          </li>
        ))}
      </ul>
      {newRole && <NewRole />}
      <button
        type="button"
        onClick={() => setNewRole(!newRole)}
      >
        {newRole ? 'Cancel' : 'New role'}
      </button>
    </>
  );
};

export { Roles };