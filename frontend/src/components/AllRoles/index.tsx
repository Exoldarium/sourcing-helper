import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { roleService } from '../../services/roles';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { NewRoleStyles } from './styles/NewRoleStyles';
import { useDispatchValue } from '../../contexts/Notification/useNotificationContext';
import { useForm } from '../../hooks/useForm';
import { AllRolesStyles } from './styles/AllRolesStyles';

const Roles = () => {
  const [newRole, setNewRole] = useState(false);
  const { inputs, handleInputs } = useForm({
    role_name: '',
    link: '',
    content: '',
    permission: [],
  });

  const dispatch = useDispatchValue();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['roles'],
    queryFn: () => roleService.getRoles()
  });
  const newRoleMutation = useMutation({
    mutationFn: () => roleService.newRole(inputs),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['roles'] });
    },
    onError: (err) => {
      dispatch({
        type: 'ERROR',
        payload: err.message
      });
    }
  });

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return null;

  const addNewRole = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    newRoleMutation.mutate();
  };

  console.log(data);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <AllRolesStyles>
        <button
          type="button"
          onClick={() => setNewRole(!newRole)}
        >
          {newRole ? 'Cancel' : 'New role'}
        </button>
        {data.map(role => (
          <li key={role.role_id}>
            <Link to={`/${role.role_id}`}>
              {role.role_name}
            </Link>
          </li>
        ))}
      </AllRolesStyles>
      {newRole &&
        <NewRoleStyles onSubmit={addNewRole}>
          <label htmlFor="role-name">Name: </label>
          <input
            type="text"
            name="role_name"
            value={inputs.role_name}
            onChange={handleInputs}
          />
          <label htmlFor="link">Link: </label>
          <input
            type="text"
            name="link"
            value={inputs.link}
            onChange={handleInputs}
          />
          <label htmlFor="content">Content: </label>
          <input
            type="text"
            name="content"
            value={inputs.content}
            onChange={handleInputs}
          />
          <button type="submit">Add</button>
        </NewRoleStyles>
      }
    </div>
  );
};

export { Roles };