import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { loginService } from '../../services/login';

const UserLogin = () => {
  const { inputs, handleInputs } = useForm({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const userLoginOnClick = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    void loginService.login(inputs);
    navigate('/');

    console.log(inputs);
  };

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