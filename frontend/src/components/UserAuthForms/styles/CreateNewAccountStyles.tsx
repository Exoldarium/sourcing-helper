import styled from 'styled-components';

const CreateNewAccountStyles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: var(--space-sm);
  p {
    font-size: var(--font-sm);
    padding: var(--space-sm);
  }
  button {
    color: var(--primary-300);
    border: 1px solid var(--primary-300);
  }
`;

export { CreateNewAccountStyles };