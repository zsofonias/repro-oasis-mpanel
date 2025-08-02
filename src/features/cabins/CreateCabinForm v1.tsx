import { useForm, type FieldErrors } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { createUpdateCabin } from '@/services/apiCabins';

import type { ICabinFormData } from './types/cabin.type';

import Input from '@/components/ui/Input';
import Form from '@/components/ui/Form';
import Button from '@/components/ui/Button';
import FileInput from '@/components/ui/FileInput';
import Textarea from '@/components/ui/Textarea';
import FormRow from '@/components/ui/FormRow';

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors: formErrors },
    reset: resetForm,
  } = useForm<ICabinFormData>();
  const queryClient = useQueryClient();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createUpdateCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('Cabin created successfully');
      resetForm();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data: ICabinFormData) {
    mutate(data);
  }

  function onError(errors: FieldErrors<ICabinFormData>) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={formErrors.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={formErrors.max_capacity?.message}
      >
        <Input
          type="number"
          id="max_capacity"
          disabled={isCreating}
          {...register('max_capacity', {
            valueAsNumber: true,
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity must be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={formErrors.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          disabled={isCreating}
          {...register('regular_price', {
            valueAsNumber: true,
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={formErrors.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register('discount', {
            valueAsNumber: true,
            required: 'This field is required',
            validate: (value) => {
              if (value < 0 || value > getValues('regular_price')) {
                return 'Discount must be between 0 and the regular price';
              }
              return true;
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={formErrors.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={formErrors.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating}
          {...register('image', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <Button variant="secondary" type="reset" disabled={isCreating}>
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isCreating ? 'Adding cabin...' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
