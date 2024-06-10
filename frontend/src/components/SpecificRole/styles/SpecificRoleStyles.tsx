import styled from 'styled-components';

const SpecificRoleStyles = styled.div`
  .specific-role-header {
    margin: 0;
    font-size: var(--font-lg);
    text-align: left;
    text-decoration: underline;
    padding-left: var(--space-md);
    cursor: default;
  }
  .specific-role-div {
    display: flex;
    flex-direction: row;
    padding: 0 var(--space-sm) 0 var(--space-sm);
    height: 80vh;
  }
  .input-date-divs {
    display: flex;
    flex-direction: row;
    flex: 1;
    height: 80vh;
  }

  @media only screen and (min-width: 767px) and (max-width: 1150px) {
    .specific-role-header {
      text-align: left;
    }
    .specific-role-div {
      display: flex;
      flex-direction: column;
      height: fit-content;
    }
  }

  @media only screen and (max-width: 767px) {
    .specific-role-header {
      text-align: center;
      font-size: var(--font-lg);
      padding: 0;
    }
    .specific-role-div {
      display: flex;
      flex-direction: column;
      height: fit-content;
    }
    .input-date-divs {
      display: flex;
      flex-direction: column;
    }
  }
`;

export { SpecificRoleStyles };