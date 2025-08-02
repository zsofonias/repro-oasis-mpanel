import supabase, { supabaseUrl } from './supabase';
import type {
  ICabin,
  ICabinFormData,
} from '@/features/cabins/types/cabin.type';

export async function getCabins(): Promise<ICabin[]> {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data!.map((cabin) => ({
    id: cabin.id,
    name: cabin.name,
    maxCapacity: cabin.max_capacity,
    regularPrice: cabin.regular_price,
    discount: cabin.discount,
    description: cabin.description,
    image: cabin.image,
    createdAt: cabin.created_at,
  }));
}

export async function createUpdateCabin(cabin: ICabinFormData) {
  let image = typeof cabin.image === 'string' ? cabin.image : '';

  if (cabin?.image?.length && typeof cabin.image !== 'string') {
    const imageName = `${Math.random()}-${cabin.image[0].name
      .replaceAll(/\s+/g, '-')
      .replaceAll('/', '')}`;

    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, cabin.image[0]);

    if (storageError) {
      throw new Error('Cabin image could not be uploaded');
    }

    image = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  let query;

  if (cabin.id) {
    query = supabase
      .from('cabins')
      .update({ ...cabin, image })
      .eq('id', cabin.id)
      .select()
      .single();
  } else {
    query = supabase
      .from('cabins')
      .insert({ ...cabin, image })
      .select()
      .single();
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  return data;
}

export async function deleteCabin(id: string) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return data;
}
