import { Route, Routes } from 'react-router-dom';
import { UserLogin } from './components/Login';
import { Users } from './components/Users';
import { NotificationMessage } from './components/NotificationMessage';
import { Roles } from './components/AllRoles';
import { SpecificRole } from './components/SpecificRole';

const App = () => {
  return (
    <>
      <Users />
      <NotificationMessage />
      <Routes>
        <Route path="/" element={<Roles />} />
        <Route path="/:id" element={<SpecificRole />} />
        <Route path="/login" element={<UserLogin />} />
      </Routes>
    </>
  );
};

export { App };
