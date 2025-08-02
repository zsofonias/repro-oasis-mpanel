import { useForm } from 'react-hook-form';

import { useSettings } from './hooks/useSettings';
import { useCreateSetting } from './hooks/useCreateSetting';
import { useUpdateSetting } from './hooks/useUpdateSetting';
import type { ISettingFormData } from './types/setting.type';

import Form from '@/components/ui/Form';
import FormRow from '@/components/ui/FormRow';
import Input from '@/components/ui/Input';
import Spinner from '@/components/ui/Spinner';

function UpdateSettingsForm() {
  const { setting, isPending } = useSettings();

  const { register, handleSubmit } = useForm<ISettingFormData>();

  const { mutate: createSetting } = useCreateSetting();
  const { mutate: updateSetting } = useUpdateSetting();

  function onSubmit(data: ISettingFormData) {
    if (!setting) {
      createSetting(data);
    } else {
      updateSetting({ ...data, id: setting.id });
    }
  }

  function handleUpdateSetting(
    e: React.FocusEvent<HTMLInputElement>,
    field: keyof ISettingFormData
  ) {
    const { value } = e.target;
    if (!value) return;
    const updatedData = { [field]: value };
    updateSetting({ ...updatedData, id: setting?.id });
  }

  // const isSubmitting = isCreating || isUpdating;

  if (isPending) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={setting?.minBookingLength}
          {...register('min_booking_length')}
          onBlur={(e) => handleUpdateSetting(e, 'min_booking_length')}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={setting?.maxBookingLength}
          {...register('max_booking_length')}
          onBlur={(e) => handleUpdateSetting(e, 'max_booking_length')}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={setting?.maxGuestsPerBooking}
          {...register('max_guests_per_booking')}
          onBlur={(e) => handleUpdateSetting(e, 'max_guests_per_booking')}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={setting?.breakfastPrice}
          {...register('breakfast_price')}
          onBlur={(e) => handleUpdateSetting(e, 'breakfast_price')}
        />
      </FormRow>
      {/* <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Update settings'}
      </Button> */}
    </Form>
  );
}

export default UpdateSettingsForm;
