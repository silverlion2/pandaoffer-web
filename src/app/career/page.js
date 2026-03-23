import { createClient } from '@/lib/supabase/server';
import CareerBoardClient from './CareerBoardClient';

export const metadata = {
  title: 'Expat Jobs & Internships in China | PandaOffer',
  description: 'Find Z-Visa sponsored jobs and legal internships for international students and expats in China. Roles at ByteDance, Shein, DJI, Huawei, and more.',
};

export default async function CareerBoard() {
  const supabase = await createClient();
  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return <CareerBoardClient jobs={jobs || []} />;
}
