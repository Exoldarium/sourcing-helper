import { Route, Routes } from 'react-router-dom';
import { UserLogin } from './components/Login';
import { Users } from './components/Users';
import { NotificationMessage } from './components/NotificationMessage';

const App = () => {
  return (
    <>
      <NotificationMessage />
      <Routes>
        <Route path='/' element={<Users />} />
        <Route path='/login' element={<UserLogin />} />
      </Routes>
    </>
  );
};

export { App };
