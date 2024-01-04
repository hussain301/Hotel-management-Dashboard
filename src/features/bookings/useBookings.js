/** @format */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useQueryParams } from '../../hooks/useUrlParams';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constant';

const useBookings = () => {
  const [searchParams] = useQueryParams();
  const queryClient = useQueryClient();

  // Filter
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  // Sort
  const sortByRaw = searchParams.get('sortBy') || 'startDate-asc';
  const [field, order] = sortByRaw.split('-');

  const sortBy = { field, order };
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  if (page > pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      retry: false,
    });

  return { bookings, count, isLoading, error };
};
export default useBookings;
