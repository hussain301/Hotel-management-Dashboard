import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking  as deleteBookingApi}  from '../../services/apiBookings'

import { toast } from 'react-hot-toast';


export function useDeleteBooking() {
    const queryClient = useQueryClient();
    
    const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
        mutationFn:deleteBookingApi,
        onSuccess: () => {
            toast.success(`Booking deleted successfully`);
            queryClient.invalidateQueries({queryKey:['bookings']});
           
        },
        onError: err => {
            toast.error('something went wrong');
            console.log(err)
        },
    });
return { deleteBooking, isDeleting };
}

