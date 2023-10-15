/** @format */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

const useCreateCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries('cabins');
      toast.success('Cabin created successfully');
      
    },
    onError: err => toast.error(err.message),
  });

  return { createCabin, isCreating };
};

export default useCreateCabin;
