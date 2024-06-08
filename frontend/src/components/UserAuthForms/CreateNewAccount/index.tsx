import { useState } from 'react';
import { ButtonStyles } from '../../ReusableStyles/ButtonStyles';
import { CreateNewAccountStyles } from '../styles/CreateNewAccountStyles';
import { useNavigate } from 'react-router-dom';

const CreateNewAccount = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate();

  const navigateToCreateAccount = () => {
    setButtonClicked(true);
    navigate('/users');
  };

  return (
    <CreateNewAccountStyles>
      <p>Don't have an account?</p>
      <ButtonStyles
        type="submit"
        $buttonClicked={buttonClicked}
        $backgroundColor='var(--neutral-100)'
        // aria-disabled={loginMutation.isPending}
        onMouseDown={navigateToCreateAccount}
        onMouseUp={() => setButtonClicked(false)}
      >
        Sing up
      </ButtonStyles>
    </CreateNewAccountStyles>
  );
};

export { CreateNewAccount };