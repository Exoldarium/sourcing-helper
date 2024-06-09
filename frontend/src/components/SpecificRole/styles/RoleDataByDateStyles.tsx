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
    padding: var(--space-sm);
    display: flex;
    flex-direction: column;
    background: var(--neutral-100);
    margin-top: var(--space-sm);
    border-radius: 5px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
    cursor: pointer;
  }
  .date-div {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .show-data-by-date-button {
    margin-top: var(--space-sm);
    padding: 0;
    height: var(--space-md);
    width: var(--space-lg);
  }
`;