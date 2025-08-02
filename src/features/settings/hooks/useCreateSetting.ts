import { createSetting } from '@/services/apiSettings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export function useCreateSetting() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success('Settings created successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending, isError, error };
}
