import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createUpdateCabin } from '@/services/apiCabins';

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createUpdateCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('Cabin created successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isPending };
}
