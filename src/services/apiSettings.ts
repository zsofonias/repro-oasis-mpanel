import supabase from './supabase';

import type {
  ISetting,
  ISettingFormData,
} from '@/features/settings/types/setting.type';

export async function getSetting(): Promise<ISetting | null> {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (!data) return null;

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return {
    id: data.id,
    minBookingLength: data.min_booking_length,
    maxBookingLength: data.max_booking_length,
    maxGuestsPerBooking: data.max_guests_per_booking,
    breakfastPrice: data.breakfast_price,
    createdAt: data.created_at,
  };
}

export async function createSetting(newSetting: ISettingFormData) {
  const { data, error } = await supabase
    .from('settings')
    .insert(newSetting)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be created');
  }
  return data;
}

export async function updateSetting(newSetting: Partial<ISettingFormData>) {
  const { data, error } = await supabase
    .from('settings')
    .update(newSetting)
    .eq('id', newSetting.id);

  if (error) {
    console.error(error);
    throw new Error('Settings could not be updated');
  }

  return data;
}
