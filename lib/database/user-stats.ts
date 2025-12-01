import { createClient } from '@/lib/supabase/server'
import type { UserStats, UpdateUserStatsInput } from '@/types/database'

/**
 * Get user stats by user ID
 */
export async function getUserStats(userId: string): Promise<UserStats | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Error fetching user stats:', error)
    return null
  }

  return data
}

/**
 * Update user stats
 */
export async function updateUserStats(
  userId: string,
  updates: UpdateUserStatsInput
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('user_stats')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)

  if (error) {
    console.error('Error updating user stats:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

/**
 * Add XP points to user and update rank if needed
 */
export async function addXP(
  userId: string,
  xpToAdd: number
): Promise<{ success: boolean; newXP?: number; error?: string }> {
  const supabase = await createClient()

  // Get current stats
  const stats = await getUserStats(userId)
  if (!stats) {
    return { success: false, error: 'User stats not found' }
  }

  const newXP = stats.xp_points + xpToAdd
  const newRank = calculateRank(newXP)

  const { error } = await supabase
    .from('user_stats')
    .update({
      xp_points: newXP,
      rank: newRank,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)

  if (error) {
    console.error('Error adding XP:', error)
    return { success: false, error: error.message }
  }

  return { success: true, newXP }
}

/**
 * Add score to user total
 */
export async function addScore(
  userId: string,
  scoreToAdd: number
): Promise<{ success: boolean; newScore?: number; error?: string }> {
  const supabase = await createClient()

  // Get current stats
  const stats = await getUserStats(userId)
  if (!stats) {
    return { success: false, error: 'User stats not found' }
  }

  const newScore = stats.total_score + scoreToAdd

  const { error } = await supabase
    .from('user_stats')
    .update({
      total_score: newScore,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)

  if (error) {
    console.error('Error adding score:', error)
    return { success: false, error: error.message }
  }

  return { success: true, newScore }
}

/**
 * Calculate rank based on XP
 */
function calculateRank(xp: number): string {
  if (xp >= 10000) return 'master'
  if (xp >= 5000) return 'expert'
  if (xp >= 2000) return 'advanced'
  if (xp >= 500) return 'intermediate'
  return 'beginner'
}
