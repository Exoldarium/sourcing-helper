import { useState } from 'react';
import { ButtonStyles } from '../../ReusableStyles/ButtonStyles';
import { CreateNewAccountStyles } from '../styles/CreateNewAccountStyles';

const CreateNewAccount = () => {
  const [buttonClicked, setButtonClicked] = useState(false);

  return (
    <CreateNewAccountStyles>
      <p>Don't have an account?</p>
      <ButtonStyles
        type="submit"
        $buttonClicked={buttonClicked}
        $backgroundColor='var(--neutral-100)'
        // aria-disabled={loginMutation.isPending}
        onMouseDown={() => setButtonClicked(true)}
        onMouseUp={() => setButtonClicked(false)}
      >
        Sing up
      </ButtonStyles>
    </CreateNewAccountStyles>
  );
};

export { CreateNewAccount };