import styled from 'styled-components';

const NewRoleStyles = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  width: 30vw;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
  button {
    width: fit-content;
    margin-top: 2rem;
  }
  input {
    border-radius: 3px;
  }
`;

export { NewRoleStyles };