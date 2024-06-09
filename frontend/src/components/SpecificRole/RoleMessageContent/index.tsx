import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import { Role } from '../../../types';
import { roleService } from '../../../services/roles';
import { useForm } from '../../../hooks/useForm';
import { useDispatchValue } from '../../../hooks/useNotificationContext';
import { RoleMessageContentStyles } from '../styles/RoleMessageContentStyles';
import { parseToString } from '../../../utils/parsingHelpers';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';
import { UpdateRoleMessageContent } from './UpdateRoleMessageContent';
import { RoleContent } from './RoleContent';
import {
  APPLY_MSG,
  BENEFITS_MSG,
  GDPR_MSG,
  INTERVIEW_MSG,
  REJECTION_MSG,
  generateApplyMessage,
  generateFollowUp
} from '../../../utils/messageData';
import { ButtonStyles } from '../../ReusableStyles/ButtonStyles';

interface Props {
  data: Role;
}

const RoleMessageContent = ({ data }: Props) => {
  const [updateRole, setUpdateRole] = useState(false);
  const [updatedRoleContent, setUpdatedRoleContent] = useState('');

  const { copyText } = useCopyToClipboard();
  const { inputs } = useForm({
    role_name: data.role_name,
    link: data.link,
    content: '',
    permission: data.permission,
    initial_msg: data.initial_msg
  });
  // console.log(data.role_name, 'data role name');
  // console.log(inputs.role_name, 'inputs role name');

  const match = useMatch('/:id');
  const queryClient = useQueryClient();
  const dispatch = useDispatchValue();
  const navigate = useNavigate();

  const parsedMatch = parseToString(match?.params.id);

  const updateRoleMutation = useMutation({
    mutationFn: () => roleService.updateRole(data.role_id, { ...inputs, content: updatedRoleContent }),
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
      localStorage.removeItem(data.role_id);
      navigate('/');
    },
    onError: (err) => {
      dispatch({
        type: 'ERROR',
        payload: err.message
      });
    }
  });

  const updateRoleOnClick = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateRoleMutation.mutate();
  };

  const deleteRole = () => {
    if (window.confirm('Are you sure you want to delete the role?')) {
      deleteRoleMutation.mutate();
    }
  };

  const copyOnClick = (string: string) => {
    void copyText(string);

    dispatch({
      type: 'MESSAGE',
      payload: 'Copied!'
    });
  };

  return (
    <RoleMessageContentStyles>
      <h3>Messages</h3>
      <div className="message-content-button-div">
        <ButtonStyles
          type="button"
          className="role-message-content-button"
          onClick={() => setUpdateRole(!updateRole)}
          $backgroundColor='var(--primary-300)'
        >
          {updateRole ? 'Cancel' : 'Update'}
        </ButtonStyles>
        <ButtonStyles
          type="button"
          className="role-message-content-button"
          onClick={deleteRole}
          $backgroundColor='var(--primary-300)'
        >
          Delete
        </ButtonStyles>
      </div>
      {!updateRole &&
        <div className="role-info">
          <p className="message-card" onClick={() => copyOnClick(data.link)}>
            <strong>Link</strong><br></br>
            {data.link.slice(0, 30) + '...'}
          </p>
          <p className="message-card" onClick={() => copyOnClick(data.initial_msg)}>
            <strong>Initial</strong><br></br>
            {data.initial_msg.slice(0, 60) + '...'}
          </p>
          {generateFollowUp(data.role_name, data.link).map((followUp, i) => (
            <p className="message-card" key={i} onClick={() => copyOnClick(followUp)}>
              <strong>Follow up {i + 1}</strong><br></br>
              {followUp.slice(0, 30) + '...'}
            </p>
          ))}
          <p className="message-card" onClick={() => copyOnClick(REJECTION_MSG)}>
            <strong>Rejection</strong><br></br>
            {REJECTION_MSG.slice(0, 30) + '...'}
          </p>
          <p className="message-card" onClick={() => copyOnClick(generateApplyMessage(data.link))}>
            <strong>Apply</strong><br></br>
            {APPLY_MSG.slice(0, 30) + '...'}
          </p>
          <p className="message-card" onClick={() => copyOnClick(INTERVIEW_MSG)}>
            <strong>Interview</strong><br></br>
            {INTERVIEW_MSG.slice(0, 30) + '...'}
          </p>
          <p className="message-card" onClick={() => copyOnClick(GDPR_MSG)}>
            <strong>GDPR</strong><br></br>
            {GDPR_MSG.slice(0, 30) + '...'}
          </p>
          <p className="message-card" onClick={() => copyOnClick(BENEFITS_MSG)}>
            <strong>Benefits</strong><br></br>
            {BENEFITS_MSG.slice(0, 30) + '...'}
          </p>
        </div>
      }
      {updateRole &&
        <UpdateRoleMessageContent
          data={data}
          updateRoleOnClick={updateRoleOnClick}
        >
          <RoleContent
            data={data}
            updateRole={updateRole}
            copyOnClick={copyOnClick}
            setUpdatedRoleContent={setUpdatedRoleContent}
          />
        </UpdateRoleMessageContent>
      }
    </RoleMessageContentStyles>
  );
};

export { RoleMessageContent };