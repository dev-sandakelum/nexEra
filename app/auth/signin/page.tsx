'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError(null)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (err: any) {
      setError(err.message || 'An error occurred with Google sign in')
    }
  }

  const handleFacebookSignIn = async () => {
    setError(null)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (err: any) {
      setError(err.message || 'An error occurred with Facebook sign in')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1>Sign In</h1>

      {/* OAuth Buttons */}
      <div style={{ marginBottom: '30px' }}>
        <button
          onClick={handleGoogleSignIn}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '10px',
            backgroundColor: '#4285f4',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
          }}
        >
          Continue with Google
        </button>

        <button
          onClick={handleFacebookSignIn}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#1877f2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
          }}
        >
          Continue with Facebook
        </button>
      </div>

      {/* Divider */}
      <div style={{ textAlign: 'center', margin: '20px 0', color: '#666' }}>
        <span style={{ backgroundColor: 'white', padding: '0 10px' }}>OR</span>
        <hr style={{ marginTop: '-12px', border: 'none', borderTop: '1px solid #ddd' }} />
      </div>

      {/* Email/Password Form */}
      <form onSubmit={handleEmailSignIn}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', fontSize: '14px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', fontSize: '14px' }}
          />
        </div>

        {error && (
          <div style={{ color: 'red', marginBottom: '15px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: loading ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
          }}
        >
          {loading ? 'Signing in...' : 'Sign In with Email'}
        </button>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Don't have an account?{' '}
        <a href="/auth/signup" style={{ color: '#0070f3' }}>
          Sign Up
        </a>
      </p>
    </div>
  )
}
