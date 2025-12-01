'use client'

import { useState } from 'react'

export default function ProfileEditor({ initialProfile }: { initialProfile: any }) {
  const [username, setUsername] = useState(initialProfile?.username || '')
  const [fullName, setFullName] = useState(initialProfile?.full_name || '')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, full_name: fullName })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Profile updated successfully!')
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      setMessage('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {message && <div style={{ marginBottom: '15px', color: message.includes('Error') ? 'red' : 'green' }}>{message}</div>}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
