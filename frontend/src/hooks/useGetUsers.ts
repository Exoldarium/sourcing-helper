import { useEffect, useState } from 'react';
import { RegularUser } from '../types';
import { services } from '../services/users';

export const useGetUsers = () => {
  const [users, setUsers] = useState<RegularUser[]>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      void (async () => {
        const allUsersAmin = await services.getUsers();

        if (allUsersAmin) {
          setUsers(allUsersAmin);
        }
      })();
    } catch (err) {
      return setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    error,
    loading,
    users
  };
};