import { useMutation } from '@tanstack/react-query';
import { useDispatchValue } from '../../hooks/useNotificationContext';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { useForm } from '../../hooks/useForm';
import { NewRoleLogEntry, Role } from '../../types';
import { RoleDataByDateStyles } from './styles/RoleDataByDateStyles';
import { roleLogService } from '../../services/roleLog';
import { useState } from 'react';
import { ButtonStyles } from '../ReusableStyles/ButtonStyles';

// TODO: consider using some library for calendar so that we can customize it

interface Props {
  data: Role;
}

const RoleDataByDate = ({ data }: Props) => {
  const [roleLogData, setRoleLogData] = useState<NewRoleLogEntry[] | null>(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const { copyText } = useCopyToClipboard();
  const { inputs, handleInputs } = useForm({
    dateTo: '',
    dateFrom: ''
  });
  const dispatch = useDispatchValue();

  const params = {
    dateFrom: inputs.dateFrom,
    dateTo: inputs.dateTo,
    roleId: data.role_id,
  };

  const getLogsMutation = useMutation({
    mutationFn: () => roleLogService.getSpecificDateData(params),
    onSuccess: (data) => setRoleLogData(data),
    onError: (err) => {
      dispatch({
        type: 'ERROR',
        payload: err.message
      });
    }
  });

  const displayDataOnClick = () => {
    if (inputs.dateFrom === '' && inputs.dateTo === '') {
      setRoleLogData(null);
    } else {
      getLogsMutation.mutate();
    }
  };

  const copyOnClick = () => {
    if (roleLogData) {
      const format = Object.entries(roleLogData[0])
        .map(([key, value]) => {
          const formattedKey = key.replace(/_/g, ' ')
            .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());

          return `${value} ${formattedKey}`;
        })
        .join('\n');

      void copyText(format);

      dispatch({
        type: 'MESSAGE',
        payload: 'Copied!'
      });
    }
  };

  return (
    <RoleDataByDateStyles>
      <h3>Generate report</h3>
      <div className="date-div">
        <label htmlFor="dateFrom">Date from:</label>
        <input
          type="date"
          name="dateFrom"
          value={inputs.dateFrom}
          onChange={handleInputs}
        />
        <label htmlFor="dateTo">Date to:</label>
        <input
          type="date"
          name="dateTo"
          value={inputs.dateTo}
          onChange={handleInputs}
        />
        <ButtonStyles
          type="button"
          className="show-data-by-date-button"
          onClick={displayDataOnClick}
          onMouseDown={() => setButtonClicked(true)}
          onMouseUp={() => setButtonClicked(false)}
          $backgroundColor='var(--primary-300)'
          $buttonClicked={buttonClicked}
        >
          Show
        </ButtonStyles>
      </div>
      {roleLogData &&
        <div className="generateReport-div" onClick={() => copyOnClick()}>
          {Object.entries(roleLogData[0]).map(([key, value], i) => {
            const stageWithoutUnderscore = key.replace('_', ' ');

            return (
              <div key={i}>
                <p>{value} {stageWithoutUnderscore.charAt(0).toUpperCase() + stageWithoutUnderscore.slice(1)}</p>
              </div>
            );
          })}
        </div>
      }
    </RoleDataByDateStyles>
  );
};

export { RoleDataByDate };