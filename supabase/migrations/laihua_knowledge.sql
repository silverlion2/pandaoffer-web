-- 来华留学 RAG — Supabase Migration
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/dfjqsoglwrcmtpyzaicw/sql/new

-- 1. Enable pgvector extension
create extension if not exists vector;

-- 2. Create knowledge table
create table if not exists public.laihua_knowledge (
  id bigserial primary key,
  content text not null,
  embedding vector(384),
  category text not null,
  source_type text not null,
  source_name text,
  language text default 'en',
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

-- 3. Vector similarity search index
create index if not exists laihua_knowledge_embedding_idx 
  on laihua_knowledge using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- 4. Row Level Security
alter table public.laihua_knowledge enable row level security;

drop policy if exists "Anyone can read knowledge" on public.laihua_knowledge;
create policy "Anyone can read knowledge" on public.laihua_knowledge for select using (true);

drop policy if exists "Admins can write knowledge" on public.laihua_knowledge;
create policy "Admins can write knowledge" on public.laihua_knowledge for insert
  with check (exists (select 1 from public.users where id = auth.uid() and role = 'admin'));

drop policy if exists "Admins can delete knowledge" on public.laihua_knowledge;
create policy "Admins can delete knowledge" on public.laihua_knowledge for delete
  using (exists (select 1 from public.users where id = auth.uid() and role = 'admin'));

drop policy if exists "Service role can write knowledge" on public.laihua_knowledge;
create policy "Service role can write knowledge" on public.laihua_knowledge for insert
  with check (auth.role() = 'service_role');

-- 5. Similarity search RPC function
create or replace function match_laihua_knowledge(
  query_embedding vector(384),
  match_threshold float default 0.5,
  match_count int default 8,
  filter_category text default null
) returns table (id bigint, content text, category text, source_name text, similarity float)
language plpgsql as $$
begin
  return query
  select lk.id, lk.content, lk.category, lk.source_name,
         1 - (lk.embedding <=> query_embedding) as similarity
  from laihua_knowledge lk
  where (filter_category is null or lk.category = filter_category)
    and 1 - (lk.embedding <=> query_embedding) > match_threshold
  order by lk.embedding <=> query_embedding
  limit match_count;
end; $$;
