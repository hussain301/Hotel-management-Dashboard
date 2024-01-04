import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import { useUserRecentBookings } from "../features/dashboard/userRecentBookings";
import { useUserRecentStays } from "../features/dashboard/userRecentStays";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";

function Dashboard() {
  const { bookings, isLoading, } = useUserRecentBookings()
  const { stays,confirmedStays,isLoading:isStaysLoading } = useUserRecentStays()
  
  
  if (isLoading || isStaysLoading) return <Spinner />
  console.log('bookings=>',bookings)
  console.log('Stays=>',stays)
  console.log('confirm Stays=>',confirmedStays)
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <DashboardFilter/>
    </Row>
    <DashboardLayout />
    </>
  );
}

export default Dashboard;
