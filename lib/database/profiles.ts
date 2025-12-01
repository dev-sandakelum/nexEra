import { createClient } from '@/lib/supabase/server'
import type { UpdateProfileInput, Profile } from '@/types/database'

/**
 * Get user profile by user ID
 */
export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return data
}

/**
 * Update user profile
 */
export async function updateProfile(
  userId: string,
  updates: UpdateProfileInput
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)

  if (error) {
    console.error('Error updating profile:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

/**
 * Check if username is available
 */
export async function isUsernameAvailable(username: string, excludeUserId?: string): Promise<boolean> {
  const supabase = await createClient()

  let query = supabase
    .from('profiles')
    .select('username')
    .eq('username', username)

  if (excludeUserId) {
    query = query.neq('id', excludeUserId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error checking username:', error)
    return false
  }

  return data.length === 0
}
