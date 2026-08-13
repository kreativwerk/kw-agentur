-- Projektanfragen aus Chatbot und Kontaktformular
create extension if not exists pgcrypto;

create table if not exists public.project_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  project_type text not null,
  description text not null,
  budget text,
  timeline text,
  name text not null,
  company text,
  email text not null,
  phone text,
  locale text not null default 'de',
  source text not null default 'chat' check (source in ('chat', 'form')),
  status text not null default 'new' check (status in ('new', 'contacted', 'won', 'lost'))
);

-- RLS aktivieren: kein anonymer Zugriff, Inserts laufen ausschließlich
-- über den Service-Key im Server (Route Handler).
alter table public.project_inquiries enable row level security;

create index if not exists project_inquiries_created_at_idx
  on public.project_inquiries (created_at desc);
