import { Route, Routes } from 'react-router-dom';
import { UserAuth } from './components/UserAuth';
import { Users } from './components/Users';
import { NotificationMessage } from './components/NotificationMessage';
import { Roles } from './components/AllRoles';
import { SpecificRole } from './components/SpecificRole';

// TODO: we can also add an option to add in the sales navigator search link
// TODO: add a loading animation when a new data is added (inv, inital etc)
// TODO: fix routing, the home route should be login

const App = () => {
  return (
    <>
      <Users />
      <NotificationMessage />
      <Routes>
        <Route path="/" element={<Roles />} />
        <Route path="/:id" element={<SpecificRole />} />
        <Route path="/login" element={<UserAuth />} />
      </Routes>
    </>
  );
};

export { App };
