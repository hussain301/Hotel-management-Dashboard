/** @format */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutUser } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      navigate('/login', { replace: true });
      queryClient.removeQueries();
    },
  });

  return {
    logout,
    isLoading,
  };
};
