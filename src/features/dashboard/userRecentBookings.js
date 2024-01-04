import {useQuery} from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { getBookingsAfterDate } from '../../services/apiBookings'


export function useUserRecentBookings() { 
    const [searchParams] = useSearchParams()

    const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last')
)
    const queryDate = subDays(new Date(), numDays).toISOString()


    const { data: bookings, isLoading } = useQuery({
        queryFn: () => getBookingsAfterDate(queryDate),
        queryKey:['bookings',`last-${numDays}`]
        
    })


return {bookings, isLoading}
}