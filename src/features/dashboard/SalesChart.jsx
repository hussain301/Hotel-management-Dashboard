/** @format */

import styled from 'styled-components';
import DashboardBox from './DashboardBox';
import React from 'react';
import Heading from '../../ui/Heading';
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { useDarkMode } from '../../context/DarkModeContext';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const SalesChart = ({ bookings, numDays }) => {
  const allDates = eachDayOfInterval({
    end: new Date(),
    start: subDays(new Date(), numDays - 1),
  });

  const chartData = allDates.map(date => {
    const bookingsOnDate = bookings.filter(booking =>
      isSameDay(date, new Date(booking.created_at))
    );

    return {
      label: format(date, 'MMM dd'),
      totalSales: bookingsOnDate.reduce(
        (acc, curr) => acc + curr.totalPrice,
        0
      ),
      extrasSales: bookingsOnDate.reduce(
        (acc, curr) => acc + curr.extrasPrice,
        0
      ),
    };
  });

  const { isDarkMode } = useDarkMode();

  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      };
  return (
    <StyledSalesChart>
      <Heading as='h2'>Sales</Heading>
      <ResponsiveContainer
        width='100%'
        height={300}
      >
        <AreaChart data={chartData}>
          <XAxis
            dataKey='label'
            stroke={colors.text}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit='$'
            stroke={colors.text}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray='4' />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            type='monotone'
            dataKey='totalSales'
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name='Total Sales'
            unit='$'
          />
          <Area
            type='monotone'
            dataKey='extrasSales'
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name='Extras Sales'
            unit='$'
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
};

export default SalesChart;
