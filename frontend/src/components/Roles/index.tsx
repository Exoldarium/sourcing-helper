import { useMutation, useQuery } from '@tanstack/react-query';
import { roleService } from '../../services/roles';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { NewRoleStyles } from './styles/NewRoleStyles';
import { useDispatchValue } from '../../contexts/Notification/useNotificationContext';
import { useForm } from '../../hooks/useForm';

const Roles = () => {
  const [newRole, setNewRole] = useState(false);
  const { inputs, handleInputs } = useForm({
    role_name: '',
    link: '',
    content: '',
    permission: [],
  });
  const { data, isLoading, error } = useQuery({
    queryKey: ['roles'],
    queryFn: () => roleService.getRoles()
  });
  const dispatch = useDispatchValue();

  const newRoleMutation = useMutation({
    mutationFn: async () => roleService.newRole(inputs),
    onSuccess: (role) => console.log(role),
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
      {newRole &&
        <NewRoleStyles onSubmit={addNewRole}>
          <label htmlFor="role-name">Name: </label>
          <input
            type="text"
            name="role_name"
            value={inputs.role_name}
            onChange={handleInputs}
          />
          <label htmlFor="url">Link: </label>
          <input
            type="url"
            name="link"
            value={inputs.link}
            onChange={handleInputs}
          />
          <label htmlFor="content">Content: </label>
          <input
            type="textbox"
            name="content"
            value={inputs.content}
            onChange={handleInputs}
          />
          <button type="submit">Add</button>
        </NewRoleStyles>
      }
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