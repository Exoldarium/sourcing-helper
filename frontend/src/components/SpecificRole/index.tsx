import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { roleService } from '../../services/roles';
import { useMatch, useNavigate } from 'react-router-dom';
import { parseToString } from '../../utils/parsingHelpers';
import { useDispatchValue } from '../../contexts/Notification/useNotificationContext';
import { RoleInfo } from './RoleInfo';
import { AddRoleData } from './AddRoleData';

const SpecificRole = () => {
  const match = useMatch('/:id');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatchValue();

  const parsedMatch = parseToString(match?.params.id);

  const { data, isLoading, error } = useQuery({
    queryKey: ['role'],
    queryFn: () => roleService.getRole(parsedMatch)
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

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return null;

  const deleteRole = () => {
    if (window.confirm('Are you sure you want to delete the role?')) {
      deleteRoleMutation.mutate();
    }
  };

  console.log(data.role_data);

  return (
    <div>
      <RoleInfo data={data} />
      <button
        type="button"
        onClick={deleteRole}
      >
        Delete Role
      </button>
      <AddRoleData data={data} />
    </div>
  );
};

export { SpecificRole };