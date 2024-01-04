/** @format */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const useCheckin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkin, isLaoding: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: data => {
      toast.success(`Booking #${data.id} checked in successfully`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },
    onError: err => {
      toast.error('something went wrong');
    },
  });
  return { checkin, isCheckingIn };
};
