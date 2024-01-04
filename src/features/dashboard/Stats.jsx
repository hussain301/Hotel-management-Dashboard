/** @format */

import React from 'react';
import Stat from './Stat';
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
  console.log(confirmedStays);
  const numOfBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupancyRate =
    (confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
      (numDays * cabinCount)) *
    100;
  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title='Bookings'
        value={numOfBookings}
        color='blue'
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title='Sales'
        value={formatCurrency(sales)}
        color='green'
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title='Check ins'
        value={checkins}
        color='indigo'
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title='OCCUPANCY RATE'
        value={Math.round(occupancyRate)+'%'}
        color='yellow'
      />
    </>
  );
};

export default Stats;
