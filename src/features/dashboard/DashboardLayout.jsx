/** @format */

import styled from 'styled-components';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

import React from 'react';
import Stats from './Stats';
import { useUserRecentBookings } from './userRecentBookings';
import { useUserRecentStays } from './userRecentStays';
import Spinner from '../../ui/Spinner';
import useCabins from '../cabins/useCabins';
import SalesChart from './SalesChart';
const DashboardLayout = () => {
  const { bookings, isLoading } = useUserRecentBookings();
  const {
    stays,
    numDays,
    confirmedStays,
    isLoading: isStaysLoading,
  } = useUserRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  if (isLoading || isStaysLoading || isLoadingCabins) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>today's activity</div>
      <div>Statistics</div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
