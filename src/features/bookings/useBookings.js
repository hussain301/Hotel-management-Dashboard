import { useQuery } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings"


const useBookings = (field) => {
     const {data:bookings, isLoading, error} = useQuery({
    queryKey:['bookings'],
    queryFn: () => getBookings(field),

     })
    return { bookings, isLoading, error }
}
export default useBookings