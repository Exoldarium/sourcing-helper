import { useQuery } from '@tanstack/react-query';
import { roleService } from '../../services/roles';
import { useMatch } from 'react-router-dom';
import { parseToString } from '../../utils/parsingHelpers';
import { RoleInfo } from './RoleInfo';
import { AddRoleData } from './AddRoleData';
import { RoleDataByDate } from './RoleDataByDate';

const SpecificRole = () => {
  const match = useMatch('/:id');

  const parsedMatch = parseToString(match?.params.id);

  const { data, isLoading, error } = useQuery({
    queryKey: ['role'],
    queryFn: () => roleService.getRole(parsedMatch)
  });

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return null;

  console.log(data.role_data);

  return (
    <>
      <h1 style={{ margin: 0, paddingLeft: '3rem' }}>{data.role_name}</h1>
      <div style={{ display: 'flex', flexDirection: 'row', padding: '2rem', height: '80vh' }}>
        <AddRoleData data={data} />
        <RoleDataByDate data={data} />
        <RoleInfo data={data} />
      </div>
    </>
  );
};

export { SpecificRole };