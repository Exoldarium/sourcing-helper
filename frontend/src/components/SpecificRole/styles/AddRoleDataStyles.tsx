import styled from 'styled-components';

export const AddRoleDataStyles = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  padding: var(--space-sm);
  font-size: var(--font-md);
  color: var(--neutral-900);
  /* background: white; */
  border-radius: 5px;
  margin: 0;
  h3 {
    margin: 0;
  }
  .addData-div {
    padding: var(--space-sm);
    display: flex;
    flex-direction: column;
    background: var(--neutral-200);
    border-radius: 5px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
    div {
      text-align: right;
      min-width: 15vw;
    }
  }
  input {
    width: var(--space-lg);
    border-radius: 5px;
    border: 1px solid var(--neutral-500);
    margin-left: var(--space-sm);
  }
  input:focus {
    border: 3px solid var(--accent-yellow-500);
    outline-width: 0;
  }
  .button-div {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .add-role-data-button {
      margin: var(--space-sm) 0 0 var(--space-sm);
      height: var(--space-md);
      width: var(--space-lg);
      padding: 0;
      text-align: center;
    }
  }
`;