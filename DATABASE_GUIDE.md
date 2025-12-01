# Database Operations Guide

This guide shows you how to save and create data in your Supabase database using the helper functions and API routes.

## Overview

I've created helper functions and API routes for all your database tables:
- **Profiles** - User profile information
- **User Stats** - Scores, XP, levels, ranks
- **Badges** - Badge system with automatic awarding
- **Activity Log** - Track user actions and points

## File Structure

```
├── types/
│   └── database.ts              # TypeScript types for all tables
├── lib/
│   └── database/
│       ├── profiles.ts          # Profile management functions
│       ├── user-stats.ts        # Stats, XP, score functions
│       ├── badges.ts            # Badge creation and awarding
│       └── activity.ts          # Activity logging
├── app/
│   └── api/
│       ├── profile/route.ts     # GET/PATCH profile
│       ├── stats/route.ts       # GET/POST stats operations
│       ├── badges/route.ts      # GET badges
│       └── activity/route.ts    # GET activity log
└── components/
    ├── ProfileEditor.tsx        # Example: Edit profile
    └── StatsManager.tsx         # Example: Add XP/score
```

---

## Usage Examples

### 1. Update User Profile

**Using API Route (from client component):**

```typescript
// Update profile
const response = await fetch('/api/profile', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'new_username',
    full_name: 'John Doe'
  })
})

const data = await response.json()
```

**Using Helper Function (from server component):**

```typescript
import { updateProfile } from '@/lib/database/profiles'

const result = await updateProfile(userId, {
  username: 'new_username',
  full_name: 'John Doe'
})

if (result.success) {
  console.log('Profile updated!')
}
```

---

### 2. Add XP Points

**Using API Route:**

```typescript
const response = await fetch('/api/stats', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'add_xp',
    value: 50  // Add 50 XP
  })
})

const data = await response.json()
```

**Using Helper Function:**

```typescript
import { addXP } from '@/lib/database/user-stats'

const result = await addXP(userId, 50)

if (result.success) {
  console.log('New XP:', result.newXP)
}
```

**Rank System:**
- 0-499 XP: beginner
- 500-1999 XP: intermediate
- 2000-4999 XP: advanced
- 5000-9999 XP: expert
- 10000+ XP: master

---

### 3. Add Score (with automatic badge awarding)

**Using API Route:**

```typescript
const response = await fetch('/api/stats', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'add_score',
    value: 100  // Add 100 points
  })
})

const data = await response.json()

// Check if user earned new badges
if (data.newBadges && data.newBadges.length > 0) {
  console.log('New badges:', data.newBadges)
}
```

**Using Helper Function:**

```typescript
import { addScore } from '@/lib/database/user-stats'
import { checkAndAwardBadges } from '@/lib/database/badges'

const result = await addScore(userId, 100)

if (result.success && result.newScore) {
  // Check for new badges
  const { newBadges } = await checkAndAwardBadges(userId, result.newScore)
  console.log('Earned badges:', newBadges)
}
```

---

### 4. Log Activity

**Using Helper Function:**

```typescript
import { logActivity } from '@/lib/database/activity'

await logActivity({
  user_id: userId,
  action_type: 'completed_challenge',
  points_earned: 50
})
```

---

### 5. Get User's Activity Log

**Using API Route:**

```typescript
const response = await fetch('/api/activity?limit=20')
const data = await response.json()

console.log('Activities:', data.activities)
```

**Using Helper Function:**

```typescript
import { getUserActivityLog } from '@/lib/database/activity'

const activities = await getUserActivityLog(userId, 20)
```

---

### 6. Get User Badges

**Using API Route:**

```typescript
// Get user's earned badges
const response = await fetch('/api/badges?type=user')
const data = await response.json()

console.log('User badges:', data.badges)

// Get all available badges
const allResponse = await fetch('/api/badges?type=all')
const allData = await allResponse.json()

console.log('All badges:', allData.badges)
```

**Using Helper Function:**

```typescript
import { getUserBadges, getAllBadges } from '@/lib/database/badges'

const userBadges = await getUserBadges(userId)
const allBadges = await getAllBadges()
```

---

### 7. Create a New Badge (Admin)

**Using Helper Function:**

```typescript
import { createBadge } from '@/lib/database/badges'

const result = await createBadge({
  name: 'First Steps',
  description: 'Complete your first challenge',
  icon_url: '/badges/first-steps.png',
  required_score: 100
})

if (result.success) {
  console.log('Badge created:', result.badgeId)
}
```

---

## Complete Example: Completing a Challenge

Here's a complete example of what happens when a user completes a challenge:

```typescript
import { addScore } from '@/lib/database/user-stats'
import { logActivity } from '@/lib/database/activity'
import { checkAndAwardBadges } from '@/lib/database/badges'

async function completeChallenge(userId: string, challengeName: string, points: number) {
  // 1. Add score
  const scoreResult = await addScore(userId, points)
  
  if (!scoreResult.success) {
    return { error: scoreResult.error }
  }

  // 2. Log the activity
  await logActivity({
    user_id: userId,
    action_type: `completed_${challengeName}`,
    points_earned: points
  })

  // 3. Check for new badges
  const { newBadges } = await checkAndAwardBadges(userId, scoreResult.newScore!)

  return {
    success: true,
    newScore: scoreResult.newScore,
    newBadges
  }
}
```

---

## API Routes Reference

### GET /api/profile
Get current user's profile

### PATCH /api/profile
Update current user's profile
```json
{
  "username": "string",
  "full_name": "string",
  "avatar_url": "string"
}
```

### GET /api/stats
Get current user's stats

### POST /api/stats
Update stats (add XP, add score, or update)
```json
{
  "action": "add_xp" | "add_score" | "update",
  "value": number,
  "updates": {} // for "update" action
}
```

### GET /api/badges?type=user|all
Get user's badges or all available badges

### GET /api/activity?limit=50
Get user's activity log

---

## Example Components

I've created two example components you can use or reference:

1. **[ProfileEditor.tsx](file:///c:/Users/Hasitha_san_/Documents/{NODE}/exe/components/ProfileEditor.tsx)** - Shows how to update user profile
2. **[StatsManager.tsx](file:///c:/Users/Hasitha_san_/Documents/{NODE}/exe/components/StatsManager.tsx)** - Shows how to add XP and score

You can import and use these in your dashboard:

```typescript
import ProfileEditor from '@/components/ProfileEditor'
import StatsManager from '@/components/StatsManager'

export default function Page() {
  return (
    <div>
      <ProfileEditor initialProfile={profile} />
      <StatsManager />
    </div>
  )
}
```

---

## TypeScript Types

All types are defined in `types/database.ts`:

```typescript
import type { 
  Profile, 
  UserStats, 
  Badge, 
  ActivityLog 
} from '@/types/database'
```

---

## Tips

1. **Always log activities** when users earn points
2. **Check for badges** after adding score
3. **Use server-side functions** when possible for better security
4. **Use API routes** from client components
5. **Handle errors** gracefully in all operations
