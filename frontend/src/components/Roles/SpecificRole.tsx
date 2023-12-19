import { useQuery } from '@tanstack/react-query';
import { roleService } from '../../services/roles';
import { useMatch } from 'react-router-dom';
import { parseToString } from '../../utils/parsingHelpers';
import { useState } from 'react';

const SpecificRole = () => {
  const [updateRoles, setUpdateRoles] = useState(false);
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
    <div>
      <h1>{data.role_name}</h1>
      {Object.keys(data.role_data[0]).map(stage => {
        const stageWithoutUnderscore = stage.replace('_', ' ');

        return (
          <div>
            <label htmlFor={stage}>
              {stageWithoutUnderscore.charAt(0).toUpperCase() + stageWithoutUnderscore.slice(1)}:
            </label>
            <input type="number" name={stage} />
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => setUpdateRoles(!updateRoles)}>
        Update
      </button>
    </div>
  );
};

export { SpecificRole };