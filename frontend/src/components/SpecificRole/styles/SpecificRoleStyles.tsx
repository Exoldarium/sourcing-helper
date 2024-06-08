import styled from 'styled-components';

const SpecificRoleStyles = styled.div`
  .specific-role-header {
     margin: 0;
     font-size: var(--font-lg);
     text-align: left;
     padding: 0 var(--space-xl) 0 var(--space-xl);
  }
  .specific-role-div {
    display: flex;
    flex-direction: row;
    padding: 0 var(--space-lg) 0 var(--space-lg);
    height: 80vh;
  }

  @media only screen and (max-width: 767px) {
    .specific-role-div {
      display: flex;
      flex-direction: column;
      padding: 0 var(--space-lg) 0 var(--space-lg);
      height: 80vh;
  }
   }
`;

export { SpecificRoleStyles };