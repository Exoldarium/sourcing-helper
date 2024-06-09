import styled from 'styled-components';

export const RoleDataByDateStyles = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  padding: var(--space-sm);
  font-size: var(--font-md);
  color: var(--neutral-900);
  background: var(--neutral-200);
  border-radius: 5px;
  margin: var(--space-sm);
  flex: 1;
  height: fit-content;
  h3 {
    margin: 0;
    cursor: default;
  }
  p {
    margin: 0;
  }
  .generateReport-div {
    display: flex;
    flex-direction: column;
    background: var(--neutral-100);
    padding: var(--space-sm);
    margin-top: var(--space-sm);
    border-radius: 5px;
    border: 1px solid var(--neutral-300);
    cursor: pointer;
  }
  .date-div {
    display: flex;
    align-items: center;
    flex-direction: column;
    input:focus {
      border: 3px solid var(--accent-yellow-500);
      outline-width: 0;
    }
  }
  .show-data-by-date-button {
    margin-top: var(--space-sm);
    padding: 0;
    height: var(--space-md);
    width: var(--space-lg);
  }
`;