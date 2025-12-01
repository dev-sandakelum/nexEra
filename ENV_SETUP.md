# Quick Reference - Environment Setup

## Required Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Get Your Supabase Credentials

1. Go to https://supabase.com/dashboard
2. Select your project
3. Click "Project Settings" (gear icon)
4. Go to "API" section
5. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Important: Run the Database Trigger

Before testing authentication, you MUST run the SQL trigger:

1. Open Supabase Dashboard → SQL Editor
2. Copy content from `lib/supabase/sql/auth_triggers.sql`
3. Paste and run in SQL Editor

This trigger automatically creates profile and user_stats entries for new users.

## Routes

- Sign Up: `/auth/signup`
- Sign In: `/auth/signin`
- Dashboard (protected): `/dashboard`

## Testing Checklist

- [ ] Add environment variables to `.env.local`
- [ ] Run database trigger in Supabase SQL Editor
- [ ] Enable Google OAuth in Supabase Dashboard
- [ ] Enable Facebook OAuth in Supabase Dashboard
- [ ] Test email/password signup
- [ ] Test email/password signin
- [ ] Test Google OAuth
- [ ] Test Facebook OAuth
- [ ] Verify dashboard access
- [ ] Test sign out
