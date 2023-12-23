import styled from 'styled-components';

export const RoleInfoStyles = styled.div`
  padding: 1rem;
  flex: 1;
  h1 {
    margin: 0;
  }
  .role-info {
    display: grid;
    grid-template-columns: 200px 200px 200px;
    grid-template-rows: 150px auto 150px; 
    column-gap: 10px;
    row-gap: 10px;
    cursor: pointer;
  }
  .role-info > *{
    border-radius: 5px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
    background: white;
    padding: 1rem;
    margin: 0;
  }
  button {
    margin: 0 0 1rem 0;
  }
`;