import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createUpdateCabin } from '@/services/apiCabins';

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createUpdateCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('Cabin updated successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isPending };
}
