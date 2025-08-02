import { useQuery } from '@tanstack/react-query';

import { getCabins } from '@/services/apiCabins';

export function useCabins() {
  const {
    data: cabins,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  return { cabins, isPending, isError, error };
}
