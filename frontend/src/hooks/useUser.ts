import { useQuery } from '@tanstack/react-query';
import { services } from '../services/users';

export const useUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => services.getUsers(),
  });

  return {
    user: data,
    isLoading,
    error
  };
};
