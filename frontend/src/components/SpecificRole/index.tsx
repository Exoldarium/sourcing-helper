import { useQuery } from '@tanstack/react-query';
import { roleService } from '../../services/roles';
import { useMatch } from 'react-router-dom';
import { parseToString } from '../../utils/parsingHelpers';
import { RoleMessageContent } from './RoleMessageContent';
import { AddRoleData } from './AddRoleData';
import { RoleDataByDate } from './RoleDataByDate';
import { SpecificRoleStyles } from './styles/SpecificRoleStyles';

const SpecificRole = () => {
  const match = useMatch('/:id');

  const { data, isLoading, error } = useQuery({
    queryKey: ['role'],
    queryFn: () => roleService.getRole(parsedMatch)
  });

  const parsedMatch = parseToString(match?.params.id);

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return null;

  return (
    <SpecificRoleStyles>
      <h1 className="specific-role-header">{data.role_name}</h1>
      <div className="specific-role-div">
        <AddRoleData data={data} />
        <RoleDataByDate data={data} />
        <RoleMessageContent data={data} />
      </div>
    </SpecificRoleStyles>
  );
};

export { SpecificRole };