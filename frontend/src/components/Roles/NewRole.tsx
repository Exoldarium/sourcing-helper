import { NewRoleStyles } from './styles/NewRoleStyles';

const NewRole = () => {
  return (
    <NewRoleStyles>
      <label htmlFor="role-name">Name: </label>
      <input type="text" name="role-name" />
      <label htmlFor="url">Link: </label>
      <input type="url" name="link" />
      <label htmlFor="content">Content: </label>
      <input type="textbox" name="content" />
      <button type="submit">Add</button>
    </NewRoleStyles>
  );
};

export { NewRole };