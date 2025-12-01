import { createClient } from '@/lib/supabase/server'
import type { Badge, CreateBadgeInput, UserBadge } from '@/types/database'

/**
 * Get all badges
 */
export async function getAllBadges(): Promise<Badge[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('badges')
    .select('*')
    .order('required_score', { ascending: true })

  if (error) {
    console.error('Error fetching badges:', error)
    return []
  }

  return data || []
}

/**
 * Get user's earned badges
 */
export async function getUserBadges(userId: string): Promise<Badge[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('user_badges')
    .select(`
      badge_id,
      earned_at,
      badges (*)
    `)
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching user badges:', error)
    return []
  }

  return data?.map((ub: any) => ub.badges).filter(Boolean) || []
}

/**
 * Award a badge to a user
 */
export async function awardBadge(
  userId: string,
  badgeId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()

  // Check if user already has this badge
  const { data: existing } = await supabase
    .from('user_badges')
    .select('*')
    .eq('user_id', userId)
    .eq('badge_id', badgeId)
    .single()

  if (existing) {
    return { success: false, error: 'User already has this badge' }
  }

  const { error } = await supabase
    .from('user_badges')
    .insert({
      user_id: userId,
      badge_id: badgeId
    })

  if (error) {
    console.error('Error awarding badge:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

/**
 * Create a new badge (admin function)
 */
export async function createBadge(
  badge: CreateBadgeInput
): Promise<{ success: boolean; badgeId?: string; error?: string }> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('badges')
    .insert(badge)
    .select('id')
    .single()

  if (error) {
    console.error('Error creating badge:', error)
    return { success: false, error: error.message }
  }

  return { success: true, badgeId: data.id }
}

/**
 * Check and award badges based on user score
 */
export async function checkAndAwardBadges(
  userId: string,
  currentScore: number
): Promise<{ newBadges: Badge[] }> {
  const supabase = await createClient()

  // Get all badges user qualifies for but doesn't have
  const { data: eligibleBadges } = await supabase
    .from('badges')
    .select('*')
    .lte('required_score', currentScore)

  if (!eligibleBadges) return { newBadges: [] }

  // Get badges user already has
  const userBadges = await getUserBadges(userId)
  const userBadgeIds = new Set(userBadges.map(b => b.id))

  // Award new badges
  const newBadges: Badge[] = []
  for (const badge of eligibleBadges) {
    if (!userBadgeIds.has(badge.id)) {
      const result = await awardBadge(userId, badge.id)
      if (result.success) {
        newBadges.push(badge)
      }
    }
  }

  return { newBadges }
}
