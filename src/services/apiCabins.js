/** @format */

import supabase, { supabaseUrl } from './supabase';

export const getCabins = async () => {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Error fetching cabins');
  }
  return data;
};

/**
 * Creates or edits a cabin in the Supabase database and uploads its image to Supabase storage.
 * @param {Object} newCabin - The cabin object to create or edit.
 * @param {string} id - The ID of the cabin to edit, or null if creating a new cabin.
 * @returns {Object} - The created or edited cabin object.
 */
export const createEditCabin = async (newCabin, id) => {
 
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  const hasImagePath = newCabin?.image.startsWith?.(supabaseUrl)
 

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/Cabin-images/${imageName}`;
  // 1. creating / editing cabin

  let query = supabase.from('cabins');
  // A. create new cabin
  if (!id) {
    console.log('this id is working')
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  // B. edit existing cabin
  if (id)
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error('Error creating cabin');
  }
  // 2. uploading image
  if (hasImagePath) return data;
  const { error: StorageError } = await supabase.storage
    .from('Cabin-images')
    .upload(imageName, newCabin.image);
  if (StorageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(StorageError);
    throw new Error(
      'Error uploading image for cabin and cabin could not be created'
    );
  }

  return data;
};

export const deleteCabin = async id => {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error('Error deleting cabin');
  }
  return data;
};
