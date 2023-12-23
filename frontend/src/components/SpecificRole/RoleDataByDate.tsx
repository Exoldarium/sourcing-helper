import { useDispatchValue } from '../../contexts/Notification/useNotificationContext';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { Role } from '../../types';
import { RoleDataByDateStyles } from './styles/RoleDataByDateStyles';

interface Props {
  data: Role;
}

// TODO: data here should not be passed through props, we should use a query to get data for a specific date
const RoleDataByDate = ({ data }: Props) => {
  const { copyText } = useCopyToClipboard();
  const dispatch = useDispatchValue();

  const copyOnClick = () => {
    const format = Object
      .entries(data.role_data[0])
      .map(([key, value]) => {
        const formattedKey = key
          .replace(/_/g, ' ')
          .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());

        return `${formattedKey}: ${value}`;
      })
      .join('\n');

    console.log(format);

    void copyText(format);

    dispatch({
      type: 'MESSAGE',
      payload: 'Copied!'
    });
  };

  return (
    <RoleDataByDateStyles>
      <h3>Generate report</h3>
      <div className="generateReport-div" onClick={() => copyOnClick()}>
        {Object.entries(data.role_data[0]).map(([key, value], i) => {
          const stageWithoutUnderscore = key.replace('_', ' ');

          return (
            <div key={i}>
              <p>{stageWithoutUnderscore.charAt(0).toUpperCase() + stageWithoutUnderscore.slice(1)}: {value}</p>
            </div>
          );
        })}
      </div>
    </RoleDataByDateStyles>
  );
};

export { RoleDataByDate };