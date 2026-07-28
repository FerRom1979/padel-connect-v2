import { useQuery } from '@tanstack/react-query';
import { getCities } from '../api/cities.api';

export function useCities(search: string) {
  return useQuery({
    queryKey: ['cities', search],
    queryFn: () => getCities(search),
    enabled: search.length >= 2,
  });
}
