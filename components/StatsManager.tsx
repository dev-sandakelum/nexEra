'use client'

import { useState } from 'react'

export default function StatsManager() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const addXP = async (amount: number) => {
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_xp', value: amount })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`Added ${amount} XP!`)
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      setMessage('Failed to add XP')
    } finally {
      setLoading(false)
    }
  }

  const addScore = async (amount: number) => {
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_score', value: amount })
      })

      const data = await response.json()

      if (response.ok) {
        let msg = `Added ${amount} points!`
        if (data.newBadges && data.newBadges.length > 0) {
          msg += ` 🎉 New badges earned: ${data.newBadges.map((b: any) => b.name).join(', ')}`
        }
        setMessage(msg)
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      setMessage('Failed to add score')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Stats Manager (Example)</h2>
      <p>Use these buttons to test adding XP and score:</p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button
          onClick={() => addXP(50)}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          Add 50 XP
        </button>

        <button
          onClick={() => addScore(100)}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          Add 100 Score
        </button>
      </div>

      {message && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: message.includes('Error') ? '#fee' : '#efe',
          borderRadius: '5px'
        }}>
          {message}
        </div>
      )}
    </div>
  )
}
