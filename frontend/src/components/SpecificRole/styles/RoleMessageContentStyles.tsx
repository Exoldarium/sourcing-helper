import styled from 'styled-components';

export const RoleMessageContentStyles = styled.div`
  /* flex: 1; */
  padding: var(--space-sm);
  margin: var(--space-sm);
  background: var(--neutral-200);
  border-radius: 5px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 70vh;
  h1, h3 {
    margin: 0;
    text-align: center;
  }
  .role-info {
    display: grid;
    justify-content: center;
    grid-template-columns: 200px 200px;
    grid-template-rows: 150px 150px; 
    column-gap: 10px;
    row-gap: 10px;
    cursor: pointer;
  }
  .message-card {
    border-radius: 5px;
    border: 3px solid transparent;
    background: var(--neutral-100);
    padding: var(--space-sm);
    margin: 0;
  }
  .message-card:hover {
    border: 3px solid var(--accent-yellow-500);
  }
  .message-content-button-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .role-message-content-button {
    padding: 0;
    margin: var(--space-sm) var(--space-sm) var(--space-sm) 0;
    height: var(--space-md);
    width: var(--space-xl);
  }

  @media only screen and (max-width: 767px) {
    .message-card {
      padding: var(--space-xs);
    }
    .role-info {
      display: grid;
      justify-content: center;
      grid-template-columns: 130px 130px;
      grid-template-rows: 100px 100px; 
      column-gap: 10px;
      row-gap: 10px;
      cursor: pointer;
    }
  }
`;

export const UpdateRoleInfo = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  width: 30vw;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
  /* color: whitesmoke; */
  button {
    width: fit-content;
    margin-top: 2rem;
  }
  input {
    border-radius: 3px;
  }
`;