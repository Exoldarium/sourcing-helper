import { Route, Routes } from 'react-router-dom';
import { UserLogin } from './components/Login';
import { Users } from './components/Users';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Users />} />
        <Route path='/login' element={<UserLogin />} />
      </Routes>
    </>
  );
};

export { App };
