import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import useBookings from "./useBookings";
import Spinner from "../../ui/Spinner";
import { useQueryParams } from "../../hooks/useUrlParams";


function BookingTable() {
  const [searchParams,] = useQueryParams()
  const field = searchParams.get('sortBy')||'*'
  const { bookings, isLoading} = useBookings(field)
  if (isLoading) return <Spinner />
  if (!bookings?.length) return <Empty resource="bookings" />;
  
  // Filter
//   const filterValue = searchParams.get('status') || 'all'

//   const filterBookings = (bookings, status) => {
//   if (status === 'all') return bookings;

//   return bookings?.filter(booking => booking.status === status);
// }



  // SORT
  // const sortBy = searchParams.get('sortBy') || 'startDate-asc'
  // const [field, order] = sortBy.split('-')
  // const modifire = order === 'asc' ? 1 : -1
  // console.log(field)
  // const filteredBookings = filterBookings(bookings, filterValue)?.sort((a, b) => {
  //   if (field ==='startDate') return modifire*(new Date(a.startDate) - new Date(b.startDate))
  //   if (field === 'totalPrice') return modifire*(a.totalPrice-b.totalPrice)
  // })



  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
