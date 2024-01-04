/** @format */

import supabase, { supabaseUrl } from './supabase';

export async function loginUser({ email, password }) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error logging in:', error.message);
    throw error;
  }
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error('something went wrong');

  return data?.user;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function signupUser({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: '' } },
  });
  if (error) throw new Error(error.message);
  return data;
}

export const updateCurrentUser = async ({ fullName, password, avatar }) => {
  let updateData;

  if (fullName) updateData = { data: { fullName } };
  if (password) updateData = { password };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;
    
  const fileName = `avatar-${data.user.id}${Date.now()}.png`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (uploadError) throw new Error(uploadError.message);

  const { data: updatedUser, error: updateAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (updateAvatarError) throw new Error(updateAvatarError.message);
  return updatedUser;
};
''