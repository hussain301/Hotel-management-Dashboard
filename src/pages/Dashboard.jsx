import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import { useUserRecentBookings } from "../features/dashboard/userRecentBookings";
import { useUserRecentStays } from "../features/dashboard/userRecentStays";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";
import Uploader from '../data/Uploader'


function Dashboard() {
  const { bookings, isLoading, } = useUserRecentBookings()
  const { stays,confirmedStays,isLoading:isStaysLoading } = useUserRecentStays()
  
  
  if (isLoading || isStaysLoading) return <Spinner />

  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <DashboardFilter/>
    </Row>
    <DashboardLayout />
      <Uploader/>
    </>
  );
}

export default Dashboard;
