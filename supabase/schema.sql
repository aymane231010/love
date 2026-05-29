-- Run in Supabase SQL Editor

create table if not exists public.date_responses (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  question_key text not null,
  answer text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (session_id, question_key)
);

create index if not exists date_responses_session_id_idx on public.date_responses (session_id);
create index if not exists date_responses_created_at_idx on public.date_responses (created_at desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists date_responses_set_updated_at on public.date_responses;
create trigger date_responses_set_updated_at
before update on public.date_responses
for each row execute function public.set_updated_at();

alter table public.date_responses enable row level security;

drop policy if exists "anon insert responses" on public.date_responses;
create policy "anon insert responses" on public.date_responses for insert to anon with check (true);

drop policy if exists "anon update responses" on public.date_responses;
create policy "anon update responses" on public.date_responses for update to anon using (true) with check (true);

drop policy if exists "anon select responses" on public.date_responses;
create policy "anon select responses" on public.date_responses for select to anon using (true);
