/** @format */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addBooking as addBookingApi } from '../../services/apiBookings';
import {toast} from 'react-hot-toast'

export function useAddBooking() {
  const queryClient = useQueryClient();
  const { mutate: addBooking, isLoading: isAddingBooking } = useMutation({
    mutationFn: addBookingApi,
    mutationKey: ['addBooking'],
    onSuccess: () => {
      toast.success(`Booking added successfully`);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: err => {
      toast.error('something went wrong');
      console.log(err);
    },
  });

  return { addBooking, isAddingBooking };
}
