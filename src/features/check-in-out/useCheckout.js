/** @format */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';

import { toast } from 'react-hot-toast';

export const useCheckout = () => {
  
  const queryClient = useQueryClient();
  const { mutate: checkout, isLaoding: isCheckingout } = useMutation({
    mutationFn: (bookingId ) =>
      updateBooking(bookingId, {
        status: 'checked-out',
        
      }),
    onSuccess: data => {
      toast.success(`Booking #${data.id} checkedout successfully`);
      queryClient.invalidateQueries({ active: true });
     
    },
    onError: err => {
      toast.error('something went wrong');
    },
  });
  return { checkout, isCheckingout };
};
