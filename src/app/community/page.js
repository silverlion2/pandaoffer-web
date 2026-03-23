import { createClient } from '@/lib/supabase/server';
import CommunityBoardClient from './CommunityBoardClient';

export const metadata = {
  title: 'Community Hub | PandaOffer',
  description: 'Join verified WeChat groups, attend expat meetups, and connect with international students across China.',
};

export default async function CommunityBoard() {
  const supabase = await createClient();

  const [{ data: events }, { data: groups }] = await Promise.all([
    supabase
      .from('community_events')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false }),
    supabase
      .from('community_groups')
      .select('*')
      .order('created_at', { ascending: true }),
  ]);

  return <CommunityBoardClient events={events || []} groups={groups || []} />;
}
