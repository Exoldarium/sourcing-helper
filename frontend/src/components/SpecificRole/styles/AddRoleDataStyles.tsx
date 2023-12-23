import styled from 'styled-components';

export const AddRoleDataStyles = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  padding: 2rem;
  input {
    width: 5rem;
    border-radius: 5px;
    margin-left: 0.7rem;
  }
  .button-div {
    display: flex;
    flex-direction: row;
    button {
      margin-right: 2rem;
      margin-top: 2rem;
    }
  }
`;