import styled from 'styled-components';

export const LoginStyles = styled.form`
  display: flex;
  flex-direction: column;
  margin: var(--space-xl) auto;
  width: 350px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
  border-radius: 5px;
  padding: 0.5rem;
  font-size: var(--font-md);
  background-color: var(--neutral-200);
  input {
    height: var(--space-md);
    width: auto;
    border: 1px solid var(--neutral-300);
    border-radius: 3px;
    margin-bottom: var(--space-sm);
  }
`;