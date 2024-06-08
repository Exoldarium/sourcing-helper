import { useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { useDispatchValue } from '../../../hooks/useNotificationContext';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginService } from '../../../services/login';
import { UserLogin } from '../../../types';
import { LoginStyles } from '../styles/LoginStyles';
import { ButtonStyles } from '../../ReusableStyles/ButtonStyles';

// TODO: add a login indicator, button can be greyed out while the user is being logged
// use loginMutation.isPending for a button color prop check

const Login = () => {
  const { inputs, handleInputs } = useForm({
    email: '',
    password: ''
  });
  const [buttonClicked, setButtonClicked] = useState(false);

  const dispatch = useDispatchValue();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async () => loginService.login(inputs as UserLogin),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['loggedUser'] });
      navigate('/');
    },
    onError: (err) => {
      dispatch({
        type: 'ERROR',
        payload: err.message
      });
    }
  });

  const userLoginOnClick = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  if (loginMutation.isPending) return <p>Logging you in...</p>;

  return (
    <LoginStyles
      method="post"
      onSubmit={userLoginOnClick}
    >
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        value={inputs.email}
        onChange={handleInputs}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={inputs.password}
        onChange={handleInputs}
      />
      <ButtonStyles
        type="submit"
        $buttonClicked={buttonClicked}
        $backgroundColor='var(--primary-300)'
        aria-disabled={loginMutation.isPending}
        onMouseDown={() => setButtonClicked(true)}
        onMouseUp={() => setButtonClicked(false)}
      >
        Log in
      </ButtonStyles>
    </LoginStyles>
  );
};

export { Login };