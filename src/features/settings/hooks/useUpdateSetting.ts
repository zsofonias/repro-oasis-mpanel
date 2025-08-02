import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateSetting } from '@/services/apiSettings';

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success('Settings updated successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending, isError, error };
}
