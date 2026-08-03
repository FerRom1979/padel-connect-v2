import { useQuery } from '@tanstack/react-query';
import { getCities } from '../api/cities.api';

export function useCities(search: string) {
  return useQuery({
    queryKey: ['cities', search],
    queryFn: () => getCities(search),
    enabled: search.trim().length >= 2,
    staleTime: 1000 * 60 * 5,
  });
}
