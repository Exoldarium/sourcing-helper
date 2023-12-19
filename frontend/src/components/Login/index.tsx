import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { loginService } from '../../services/login';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatchValue } from '../../contexts/Notification/useNotificationContext';

const UserLogin = () => {
  const { inputs, handleInputs } = useForm({
    email: '',
    password: ''
  });
  const dispatch = useDispatchValue();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async () => loginService.login(inputs),
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
    <form
      style={{ display: 'flex', flexDirection: 'column', width: '30vw' }}
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
      <button type="submit">Log in</button>
    </form>
  );
};

export { UserLogin };