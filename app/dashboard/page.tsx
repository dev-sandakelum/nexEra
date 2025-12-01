import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/auth/signin')
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Fetch user stats
  const { data: stats } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <h1>Dashboard</h1>
      
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>User Information</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>
        {profile && (
          <>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Full Name:</strong> {profile.full_name || 'Not set'}</p>
          </>
        )}
      </div>

      {stats && (
        <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h2>Stats</h2>
          <p><strong>Security Level:</strong> {stats.security_level}</p>
          <p><strong>Total Score:</strong> {stats.total_score}</p>
          <p><strong>XP Points:</strong> {stats.xp_points}</p>
          <p><strong>Rank:</strong> {stats.rank}</p>
        </div>
      )}

      <form action="/auth/signout" method="post">
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Sign Out
        </button>
      </form>
    </div>
  )
}
