import { Role } from '../../types';

interface Props {
  data: Role;
}

const AddRoleData = ({ data }: Props) => {
  return (
    <div>
      {Object.keys(data.role_data[0]).map((stage, i) => {
        const stageWithoutUnderscore = stage.replace('_', ' ');

        return (
          <div key={i}>
            <label htmlFor={stage}>
              {stageWithoutUnderscore.charAt(0).toUpperCase() + stageWithoutUnderscore.slice(1)}:
            </label>
            <input type="number" name={stage} />
          </div>
        );
      })}
    </div>

  );
};

export { AddRoleData };