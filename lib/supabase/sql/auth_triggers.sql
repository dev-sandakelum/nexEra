-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  default_username TEXT;
BEGIN
  -- Generate a default username from email or user id
  default_username := COALESCE(
    split_part(NEW.email, '@', 1),
    'user_' || substring(NEW.id::text, 1, 8)
  );

  -- Create profile entry
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    default_username,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );

  -- Create user_stats entry
  INSERT INTO public.user_stats (user_id, security_level, total_score, xp_points, rank)
  VALUES (
    NEW.id,
    'NexNova',
    0,
    0,
    'beginner'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile and stats on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
