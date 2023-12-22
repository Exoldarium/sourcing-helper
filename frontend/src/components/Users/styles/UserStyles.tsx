import styled from 'styled-components';

export const UserStyles = styled.nav`
  /* border-bottom: 1px solid black; */
  display: flex;
  flex-direction: row;
  justify-content: flex-end; 
  align-items: center;
  padding: 0.7rem;
  background: #d5d5d5;
  font-weight: bold;
  > * {
    margin: 0.5rem;
  }
  div {
    padding: 0.2rem;
  }
  a {
    flex: 1;
  }
`;