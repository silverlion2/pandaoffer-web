-- Migration: Add Life Features to PandaOffer

-- 1. Add new columns to user_profiles for expats already in China
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS current_city TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS hsk_level TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS job_status TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS visa_type TEXT;

-- 2. Create saved_jobs table
CREATE TABLE IF NOT EXISTS saved_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, job_id)
);

-- 3. Create saved_events table
CREATE TABLE IF NOT EXISTS saved_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, event_id)
);

-- 4. Enable RLS and setup policies for saved_jobs
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own saved jobs" ON saved_jobs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own saved jobs" ON saved_jobs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own saved jobs" ON saved_jobs FOR DELETE USING (auth.uid() = user_id);

-- 5. Enable RLS and setup policies for saved_events
ALTER TABLE saved_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own saved events" ON saved_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own saved events" ON saved_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own saved events" ON saved_events FOR DELETE USING (auth.uid() = user_id);
