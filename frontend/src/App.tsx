import { Route, Routes } from 'react-router-dom';
import { UserLogin } from './components/Login';
import { Users } from './components/Users';
import { NotificationMessage } from './components/NotificationMessage';
import { Roles } from './components/AllRoles';
import { SpecificRole } from './components/SpecificRole';

// TODO: we can also add an option to add in the sales navigator search link
// TODO: add a loading animation when a new data is added (inv, inital etc)
// TODO: fix the inputs at the moment when creating a new role the previous input is saved (not a priority)
// TODO: fix routing, the home route should be login

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
