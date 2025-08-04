import { useForm, type FieldErrors } from 'react-hook-form';

import { useCreateCabin } from './hooks/useCreateCabin';
import { useUpdateCabin } from './hooks/useUpdateCabin';
import type { ICabin, ICabinFormData } from './types/cabin.type';

import Input from '@/components/ui/Input';
import Form from '@/components/ui/Form';
import Button from '@/components/ui/Button';
import FileInput from '@/components/ui/FileInput';
import Textarea from '@/components/ui/Textarea';
import FormRow from '@/components/ui/FormRow';

type Props = {
  cabin?: ICabin;
  onCloseModal?: () => void;
};

function CabinForm({ cabin, onCloseModal }: Props) {
  const isEdit = !!cabin?.id;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors: formErrors },
    reset: resetForm,
  } = useForm<ICabinFormData>({
    defaultValues: isEdit
      ? {
          name: cabin.name,
          max_capacity: cabin.maxCapacity,
          regular_price: cabin.regularPrice,
          discount: cabin.discount,
          description: cabin.description,
          image: cabin.image,
        }
      : {},
  });
  const { mutate: createCabin, isPending: isCreating } = useCreateCabin();
  const { mutate: updateCabin, isPending: isUpdating } = useUpdateCabin();

  const formLoading = isCreating || isUpdating;

  function onSubmit(data: ICabinFormData) {
    isEdit
      ? updateCabin({ ...data, id: cabin.id })
      : createCabin(data, {
          onSuccess: () => {
            resetForm();
            onCloseModal?.();
          },
        });
  }

  function onError(errors: FieldErrors<ICabinFormData>) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Cabin name" error={formErrors.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={formLoading}
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
          disabled={formLoading}
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
          disabled={formLoading}
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
          disabled={formLoading}
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
          disabled={formLoading}
          {...register('image', {
            required: isEdit ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variant="secondary"
          type="reset"
          onClick={(e) => {
            e.preventDefault();
            onCloseModal?.();
          }}
          disabled={formLoading}
        >
          Cancel
        </Button>
        <Button disabled={formLoading}>
          {isEdit ? 'Update cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CabinForm;
