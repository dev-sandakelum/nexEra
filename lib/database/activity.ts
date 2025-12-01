import { createClient } from '@/lib/supabase/server'
import type { ActivityLog, CreateActivityLogInput } from '@/types/database'

/**
 * Log an activity
 */
export async function logActivity(
  activity: CreateActivityLogInput
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('activity_log')
    .insert(activity)

  if (error) {
    console.error('Error logging activity:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

/**
 * Get user's activity log
 */
export async function getUserActivityLog(
  userId: string,
  limit: number = 50
): Promise<ActivityLog[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('activity_log')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching activity log:', error)
    return []
  }

  return data || []
}

/**
 * Get recent activity across all users (for leaderboard/feed)
 */
export async function getRecentActivity(limit: number = 20): Promise<ActivityLog[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('activity_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent activity:', error)
    return []
  }

  return data || []
}
