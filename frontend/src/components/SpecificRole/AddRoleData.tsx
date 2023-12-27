import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from '../../hooks/useForm';
import { NewRoleLogEntry, Role } from '../../types';
import { roleLogService } from '../../services/roleLog';
import { useDispatchValue } from '../../contexts/Notification/useNotificationContext';
import { AddRoleDataStyles } from './styles/AddRoleDataStyles';

// TODO: add a way to sort by date
// TODO: consider adding dark mode instead of using all white and gray background

interface Props {
  data: Role;
}

const AddRoleData = ({ data }: Props) => {
  const { inputs, handleInputs } = useForm({
    invitation: 0,
    initial_contact: 0,
    replied: 0,
    job_description: 0,
    application_reviewed: 0,
    proposed: 0,
    accepted: 0,
    rejected: 0,
    follow_up: 0,
  });
  const queryClient = useQueryClient();
  const dispatch = useDispatchValue();

  const addDataMutation = useMutation({
    mutationFn: () => roleLogService.addNewDataToRole(inputs, data.role_id),
    onSuccess: async () => await queryClient.refetchQueries({ queryKey: ['roles'] }),
    onError: (error) => {
      dispatch({
        type: 'ERROR',
        payload: error.message
      });
    }
  });
  const undoLastDataAdded = useMutation({
    mutationFn: async () => await roleLogService.removeLastDataAdded(data.role_id),
    onSuccess: async () => await queryClient.refetchQueries({ queryKey: ['roles'] }),
    onError: (error) => {
      dispatch({
        type: 'ERROR',
        payload: error.message
      });
    }
  });

  const addRoleData = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    addDataMutation.mutate();
  };

  const undoLastLogAdded = () => {
    if (window.confirm('Are you sure you want to undo last log added?')) {
      undoLastDataAdded.mutate();
    }
  };

  return (
    <AddRoleDataStyles onSubmit={addRoleData}>
      <h3>Input candidate data</h3>
      <div className='addData-div'>
        {Object.keys(data.role_data[0]).map((stage, i) => {
          const stageWithoutUnderscore = stage.replace('_', ' ');
          const getInput = inputs[stage as keyof NewRoleLogEntry];

          return (
            <div key={i}>
              <label htmlFor={stage}>
                {stageWithoutUnderscore.charAt(0).toUpperCase() + stageWithoutUnderscore.slice(1)}:
              </label>
              <input
                type="number"
                min="0"
                name={stage}
                value={getInput}
                onChange={handleInputs}
              />
            </div>
          );
        })}
      </div>
      <div className="button-div">
        <button
          type="submit"
        >
          Add
        </button>
        <button
          type="button"
          onClick={undoLastLogAdded}
        >
          Undo
        </button>
      </div>
    </AddRoleDataStyles>
  );
};

export { AddRoleData };