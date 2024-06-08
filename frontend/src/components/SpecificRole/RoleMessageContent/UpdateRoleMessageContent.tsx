import { ReactNode } from 'react';
import { useForm } from '../../../hooks/useForm';
import { Role } from '../../../types';
import { UpdateRoleInfo } from '../styles/RoleInforStyles';

interface Props {
  children: ReactNode;
  data: Role;
  updateRoleOnClick: (e: React.ChangeEvent<HTMLFormElement>) => void;
}

const UpdateRoleMessageContent = ({ children, data, updateRoleOnClick }: Props) => {
  const { inputs, handleInputs } = useForm({
    role_name: data.role_name,
    link: data.link,
    content: '',
    permission: data.permission,
    initial_msg: data.initial_msg
  });

  return (
    <UpdateRoleInfo onSubmit={updateRoleOnClick}>
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
      {children}
      <label htmlFor="initial_msg">Initial message: </label>
      <input
        type="text"
        name="initial_msg"
        value={inputs.initial_msg}
        onChange={handleInputs}
      />
      <button type="submit">Update</button>
    </UpdateRoleInfo>
  );
};

export { UpdateRoleMessageContent };