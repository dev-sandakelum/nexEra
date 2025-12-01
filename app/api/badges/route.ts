import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { getUserBadges, getAllBadges } from '@/lib/database/badges'

export async function GET(request: Request) {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'user' // 'user' or 'all'

  if (type === 'all') {
    const badges = await getAllBadges()
    return NextResponse.json({ badges })
  }

  const badges = await getUserBadges(user.id)
  return NextResponse.json({ badges })
}
