-- Route-level voting / popularity tracking.
-- The public UI shows a seeded baseline count; this table stores only real visitor interactions.

CREATE TABLE IF NOT EXISTS public.route_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_path TEXT NOT NULL CHECK (route_path ~ '^/'),
  voter_key TEXT NOT NULL CHECK (voter_key ~ '^[a-f0-9]{64}$'),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(route_path, voter_key)
);

CREATE INDEX IF NOT EXISTS route_votes_route_path_idx ON public.route_votes(route_path);
CREATE INDEX IF NOT EXISTS route_votes_created_at_idx ON public.route_votes(created_at DESC);

ALTER TABLE public.route_votes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view route votes" ON public.route_votes;
CREATE POLICY "Admins can view route votes" ON public.route_votes
  FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Admins can delete route votes" ON public.route_votes;
CREATE POLICY "Admins can delete route votes" ON public.route_votes
  FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));
