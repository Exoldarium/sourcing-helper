import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { roleService } from '../../services/roles';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NewRoleStyles } from './styles/NewRoleStyles';
import { useDispatchValue } from '../../contexts/Notification/useNotificationContext';
import { useForm } from '../../hooks/useForm';
import { AllRolesStyles } from './styles/AllRolesStyles';

const Roles = () => {
  const [newRole, setNewRole] = useState(false);
  const { inputs, handleInputs } = useForm({
    role_name: '',
    permission: [],
  });

  const dispatch = useDispatchValue();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['roles'],
    queryFn: () => roleService.getRoles()
  });

  const newRoleMutation = useMutation({
    mutationFn: () => roleService.newRole(inputs),
    onSuccess: async () => {
      setNewRole(false);
      await queryClient.refetchQueries({ queryKey: ['roles'] });
    },
    onError: (err) => {
      dispatch({
        type: 'ERROR',
        payload: err.message
      });
    }
  });

  useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error, navigate]);

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
      {!newRole &&
        <AllRolesStyles>
          {data.map(role => (
            <li key={role.role_id}>
              <Link to={`/${role.role_id}`}>
                {role.role_name}
              </Link>
            </li>
          ))}
          <button
            type="button"
            onClick={() => setNewRole(!newRole)}
          >
            New role
          </button>
        </AllRolesStyles>
      }
      {newRole &&
        <NewRoleStyles onSubmit={addNewRole}>
          <label htmlFor="role-name">Name: </label>
          <input
            type="text"
            name="role_name"
            value={inputs.role_name}
            onChange={handleInputs}
          />
          <button type="submit">Add</button>
          <button
            type="button"
            onClick={() => setNewRole(!newRole)}
          >
            Cancel
          </button>
        </NewRoleStyles>
      }
    </div>
  );
};

export { Roles };