import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { getUserActivityLog } from '@/lib/database/activity'

export async function GET(request: Request) {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '50')

  const activities = await getUserActivityLog(user.id, limit)

  return NextResponse.json({ activities })
}
