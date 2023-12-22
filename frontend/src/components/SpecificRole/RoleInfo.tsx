import { useState } from 'react';
import { Role } from '../../types';
import { NewRoleStyles } from '../AllRoles/styles/NewRoleStyles';
import { useForm } from '../../hooks/useForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { roleService } from '../../services/roles';
import { useDispatchValue } from '../../contexts/Notification/useNotificationContext';
import { RoleInfoStyles } from './styles/RoleInforStyles';
import { useMatch, useNavigate } from 'react-router-dom';
import { parseToString } from '../../utils/parsingHelpers';

interface Props {
  data: Role;
}

const RoleInfo = ({ data }: Props) => {
  const [updateRole, setUpdateRole] = useState(false);
  const { inputs, handleInputs } = useForm({
    role_name: data.role_name,
    link: data.link,
    content: data.content,
    permission: data.permission,
    initial_msg: data.initial_msg
  });
  const match = useMatch('/:id');
  const queryClient = useQueryClient();
  const dispatch = useDispatchValue();
  const parsedMatch = parseToString(match?.params.id);
  const navigate = useNavigate();

  const updateRoleMutation = useMutation({
    mutationFn: () => roleService.updateRole(data.role_id, inputs),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['role'] });
      setUpdateRole(false);
    },
    onError: (err) => {
      dispatch({
        type: 'ERROR',
        payload: err.message
      });
    }
  });
  const deleteRoleMutation = useMutation({
    mutationFn: () => roleService.deleteRole(parsedMatch),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['roles'] });
      navigate('/');
    },
    onError: (err) => {
      dispatch({
        type: 'ERROR',
        payload: err.message
      });
    }
  });

  const updateRolenClick = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateRoleMutation.mutate();
  };

  const deleteRole = () => {
    if (window.confirm('Are you sure you want to delete the role?')) {
      deleteRoleMutation.mutate();
    }
  };

  return (
    <RoleInfoStyles>
      {!updateRole &&
        <div>
          <h1>{data.role_name}</h1>
          <p>{data.link}</p>
          <p>{data.initial_msg}</p>
          <p>{data.content}</p>
        </div>
      }
      <div>
        {updateRole &&
          <NewRoleStyles onSubmit={updateRolenClick}>
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
            <label htmlFor="initial_msg">Initial message: </label>
            <input
              type="text"
              name="initial_msg"
              value={inputs.initial_msg}
              onChange={handleInputs}
            />
            <button type="submit">Update</button>
          </NewRoleStyles>
        }
      </div>
      <button
        type="button"
        onClick={() => setUpdateRole(!updateRole)}
      >
        {updateRole ? 'Cancel' : 'Update role'}
      </button>
      <button
        type="button"
        onClick={deleteRole}
      >
        Delete Role
      </button>
    </RoleInfoStyles>
  );
};

export { RoleInfo };