import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { addXP, addScore, updateUserStats } from '@/lib/database/user-stats'
import { logActivity } from '@/lib/database/activity'
import { checkAndAwardBadges } from '@/lib/database/badges'

export async function GET() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: stats } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return NextResponse.json({ stats })
}

export async function POST(request: Request) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { action, value } = body

  let result
  let newBadges: string | any[] | undefined = []

  switch (action) {
    case 'add_xp':
      result = await addXP(user.id, value)
      if (result.success) {
        await logActivity({
          user_id: user.id,
          action_type: 'xp_earned',
          points_earned: value
        })
      }
      break

    case 'add_score':
      result = await addScore(user.id, value)
      if (result.success && result.newScore) {
        await logActivity({
          user_id: user.id,
          action_type: 'score_earned',
          points_earned: value
        })
        // Check for new badges
        const badgeResult = await checkAndAwardBadges(user.id, result.newScore)
        newBadges = badgeResult.newBadges
      }
      break

    case 'update':
      result = await updateUserStats(user.id, body.updates)
      break

    default:
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  return NextResponse.json({ 
    success: true, 
    newBadges: newBadges.length > 0 ? newBadges : undefined 
  })
}
