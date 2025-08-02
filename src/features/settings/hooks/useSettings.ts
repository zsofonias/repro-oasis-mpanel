import { useQuery } from '@tanstack/react-query';
import { getSetting } from '@/services/apiSettings';

export function useSettings() {
  const {
    data: setting,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['settings'],
    queryFn: getSetting,
  });

  return { setting, isPending, isError, error };
}
