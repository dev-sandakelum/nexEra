-- Profiles (basic user info)
create table profiles (
  id uuid references auth.users primary key,
  username text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamp default now()
);

-- User Stats (scores, levels)
create table user_stats (
  user_id uuid references auth.users primary key,
  security_level text default "NexNova",
  total_score integer default 0,
  xp_points integer default 0,
  rank text default 'beginner',
  updated_at timestamp default now()
);

-- Badges
create table badges (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  icon_url text,
  required_score integer
);

-- User Badges (many-to-many)
create table user_badges (
  user_id uuid references auth.users,
  badge_id uuid references badges,
  earned_at timestamp default now(),
  primary key (user_id, badge_id)
);

-- Activity Log (for tracking score changes)
create table activity_log (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users,
  action_type text,
  points_earned integer,
  created_at timestamp default now()
);