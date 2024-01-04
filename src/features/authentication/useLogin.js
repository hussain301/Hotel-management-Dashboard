/** @format */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser as login } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: loginUser, isLoading: isLogging } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      navigate('/dashboard',{replace:true});
      toast.success('Login successful');
    },
    onError: error => {
      toast.error('Email or password is incorrect');
    },
  });

  return { loginUser, isLogging };
};

export default useLogin;
