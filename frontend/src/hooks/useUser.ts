import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/users';

export const useUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['loggedUser'],
    queryFn: () => userService.getLoggedInUser(),
    retry: 1
  });

  return {
    user: data,
    isLoading,
    error
  };
};
