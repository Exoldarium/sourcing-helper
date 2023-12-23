import styled from 'styled-components';

export const AddRoleDataStyles = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  padding: 2rem;
  background: white;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
  margin: 1rem;
  h3 {
    margin: 0;
  }
  .addData-div {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background: whitesmoke;
    border-radius: 5px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
  }
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