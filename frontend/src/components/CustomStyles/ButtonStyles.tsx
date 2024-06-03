import styled from 'styled-components';

const ButtonStyles = styled.button<{ $buttonClicked?: boolean; }>`
  height: var(--space-lg);
  width: auto;
  background-color: ${props => props.$buttonClicked ? 'var(--neutral-500)' : 'var(--primary-300)'};
  font-size: var(--font-md);
  color: var(--neutral-100);
  padding: var(--space-sm);
  border: none;
  border-radius: 5px;
`;

export { ButtonStyles };