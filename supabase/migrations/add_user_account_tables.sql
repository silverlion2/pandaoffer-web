-- PandaOffer User Account System — New Tables Migration
-- Run this in your Supabase SQL editor

-- 1. Saved Universities
CREATE TABLE IF NOT EXISTS public.saved_universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  university_name TEXT NOT NULL,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, university_name)
);

-- 2. AI Matcher History
CREATE TABLE IF NOT EXISTS public.match_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  form_data JSONB NOT NULL,
  results JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Saved AI Chat Q&A Pairs
CREATE TABLE IF NOT EXISTS public.saved_chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sources JSONB DEFAULT '[]'::jsonb,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.saved_universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_chats ENABLE ROW LEVEL SECURITY;

-- RLS Policies: saved_universities
DROP POLICY IF EXISTS "Users can view own saved universities" ON public.saved_universities;
CREATE POLICY "Users can view own saved universities" ON public.saved_universities FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own saved universities" ON public.saved_universities;
CREATE POLICY "Users can insert own saved universities" ON public.saved_universities FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own saved universities" ON public.saved_universities;
CREATE POLICY "Users can delete own saved universities" ON public.saved_universities FOR DELETE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all saved universities" ON public.saved_universities;
CREATE POLICY "Admins can view all saved universities" ON public.saved_universities FOR SELECT USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- RLS Policies: match_history
DROP POLICY IF EXISTS "Users can view own match history" ON public.match_history;
CREATE POLICY "Users can view own match history" ON public.match_history FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own match history" ON public.match_history;
CREATE POLICY "Users can insert own match history" ON public.match_history FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own match history" ON public.match_history;
CREATE POLICY "Users can delete own match history" ON public.match_history FOR DELETE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all match history" ON public.match_history;
CREATE POLICY "Admins can view all match history" ON public.match_history FOR SELECT USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- RLS Policies: saved_chats
DROP POLICY IF EXISTS "Users can view own saved chats" ON public.saved_chats;
CREATE POLICY "Users can view own saved chats" ON public.saved_chats FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own saved chats" ON public.saved_chats;
CREATE POLICY "Users can insert own saved chats" ON public.saved_chats FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own saved chats" ON public.saved_chats;
CREATE POLICY "Users can delete own saved chats" ON public.saved_chats FOR DELETE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all saved chats" ON public.saved_chats;
CREATE POLICY "Admins can view all saved chats" ON public.saved_chats FOR SELECT USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));
