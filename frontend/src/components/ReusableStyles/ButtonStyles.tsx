import styled from 'styled-components';

const ButtonStyles = styled.button<{
  $buttonClicked?: boolean;
  $backgroundColor?: string;
}>`
  height: var(--space-lg);
  width: auto;
  background-color: ${props => props.$buttonClicked ? 'var(--neutral-400)' : props.$backgroundColor};
  font-size: var(--font-md);
  color: var(--neutral-100);
  padding: var(--space-sm);
  border: none;
  border-radius: 5px;
`;

export { ButtonStyles };