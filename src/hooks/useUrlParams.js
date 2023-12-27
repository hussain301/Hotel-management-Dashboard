import { useSearchParams } from 'react-router-dom';

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setQueryParam = (key, value) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  return [searchParams, setQueryParam];
}