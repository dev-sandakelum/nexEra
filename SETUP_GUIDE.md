# Supabase Authentication Setup Guide

This guide will help you set up the Supabase authentication system for your Next.js application.

## Prerequisites

- A Supabase project (create one at https://supabase.com)
- Node.js and npm installed
- Next.js project initialized

## Step 1: Install Dependencies

The required dependencies have been added to your project. Run:

```bash
npm install @supabase/supabase-js @supabase/ssr
```

## Step 2: Configure Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

To find these values:
1. Go to your Supabase project dashboard
2. Click on "Project Settings" (gear icon)
3. Go to "API" section
4. Copy the "Project URL" and "anon public" key

## Step 3: Run Database Trigger

The database trigger automatically creates profile and user_stats entries when users sign up.

1. Open your Supabase project dashboard
2. Go to "SQL Editor"
3. Open the file `lib/supabase/sql/auth_triggers.sql`
4. Copy the entire SQL script
5. Paste it into the Supabase SQL Editor
6. Click "Run" to execute the script

## Step 4: Enable OAuth Providers

### Google OAuth

1. Go to Supabase Dashboard → Authentication → Providers
2. Find "Google" and click to expand
3. Enable the provider
4. You'll need to create OAuth credentials in Google Cloud Console:
   - Go to https://console.cloud.google.com
   - Create a new project or select existing
   - Enable Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth client ID"
   - Set application type to "Web application"
   - Add authorized redirect URIs:
     - `https://your-project-ref.supabase.co/auth/v1/callback`
   - Copy Client ID and Client Secret
5. Paste Client ID and Client Secret into Supabase
6. Save the configuration

### Facebook OAuth

1. Go to Supabase Dashboard → Authentication → Providers
2. Find "Facebook" and click to expand
3. Enable the provider
4. You'll need to create a Facebook App:
   - Go to https://developers.facebook.com
   - Click "My Apps" → "Create App"
   - Choose "Consumer" as app type
   - Fill in app details
   - Go to "Settings" → "Basic"
   - Copy App ID and App Secret
   - Add your domain to "App Domains"
   - Go to "Facebook Login" → "Settings"
   - Add OAuth redirect URI: `https://your-project-ref.supabase.co/auth/v1/callback`
5. Paste App ID and App Secret into Supabase
6. Save the configuration

## Step 5: Configure Callback URLs

In your Supabase Dashboard:
1. Go to Authentication → URL Configuration
2. Add your site URL:
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`
3. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://yourdomain.com/auth/callback` (for production)

## Step 6: Test the Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/auth/signup` to create an account

3. Test the following flows:
   - Email/password signup
   - Email/password signin
   - Google OAuth signin
   - Facebook OAuth signin
   - Access protected dashboard at `/dashboard`
   - Sign out functionality

## File Structure

```
├── app/
│   ├── auth/
│   │   ├── signup/
│   │   │   └── page.tsx          # Sign-up page
│   │   ├── signin/
│   │   │   └── page.tsx          # Sign-in page
│   │   ├── callback/
│   │   │   └── route.ts          # OAuth callback handler
│   │   └── signout/
│   │       └── route.ts          # Sign-out handler
│   └── dashboard/
│       └── page.tsx              # Protected dashboard
├── lib/
│   └── supabase/
│       ├── client.ts             # Browser client
│       ├── server.ts             # Server client
│       ├── middleware.ts         # Middleware client
│       └── sql/
│           └── auth_triggers.sql # Database trigger
└── middleware.ts                 # Next.js middleware

```

## Troubleshooting

### "Invalid login credentials" error
- Verify your email and password are correct
- Check if email confirmation is required in Supabase settings

### OAuth redirect errors
- Ensure callback URLs are correctly configured in both Supabase and OAuth provider settings
- Check that the redirect URL matches exactly (including http/https)

### Profile not created
- Verify the database trigger was executed successfully
- Check Supabase logs for any errors
- Ensure the profiles and user_stats tables exist

### TypeScript errors
- Make sure all dependencies are installed
- Run `npm install` to ensure packages are properly installed

## Next Steps

- Add password reset functionality
- Customize the UI with your preferred styling
- Add email verification flow
- Implement role-based access control
- Add user profile editing functionality
