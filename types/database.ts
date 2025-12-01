// Database table types based on your schema

export interface Profile {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
}

export interface UserStats {
  user_id: string
  security_level: string
  total_score: number
  xp_points: number
  rank: string
  updated_at: string
}

export interface Badge {
  id: string
  name: string
  description: string | null
  icon_url: string | null
  required_score: number | null
}

export interface UserBadge {
  user_id: string
  badge_id: string
  earned_at: string
}

export interface ActivityLog {
  id: string
  user_id: string
  action_type: string
  points_earned: number
  created_at: string
}

// Input types for creating/updating records

export interface UpdateProfileInput {
  username?: string
  full_name?: string
  avatar_url?: string
}

export interface UpdateUserStatsInput {
  security_level?: string
  total_score?: number
  xp_points?: number
  rank?: string
}

export interface CreateBadgeInput {
  name: string
  description?: string
  icon_url?: string
  required_score?: number
}

export interface CreateActivityLogInput {
  user_id: string
  action_type: string
  points_earned: number
}
