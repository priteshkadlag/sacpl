-- SACPL website — Supabase schema
-- 1) Form storage (used by src/lib/server/delivery.ts when SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set)
-- 2) Optional content tables mirroring src/content/schema.ts, for moving content into Supabase later.
-- Run in the Supabase SQL editor of a NEW project (do not reuse the legacy project without reviewing its RLS).

-- ---------------------------------------------------------------
-- 1. Submissions — write-only from the server; no public access
-- ---------------------------------------------------------------
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  payload jsonb not null,
  attachment_path text,
  status text not null default 'new' check (status in ('new', 'in_progress', 'closed', 'spam')),
  created_at timestamptz not null default now()
);

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  payload jsonb not null,
  attachment_path text,
  status text not null default 'new' check (status in ('new', 'shortlisted', 'rejected', 'hired')),
  created_at timestamptz not null default now()
);

alter table public.enquiries enable row level security;
alter table public.job_applications enable row level security;
-- No policies for anon/authenticated: only the service role (server) can read/write.

-- Private bucket for attachments (résumés and drawings)
insert into storage.buckets (id, name, public) values ('form-uploads', 'form-uploads', false)
on conflict (id) do nothing;

-- ---------------------------------------------------------------
-- 2. Content (optional CMS) — public read of published rows only
-- ---------------------------------------------------------------
create table if not exists public.projects (
  slug text primary key,
  legacy_id uuid,
  name text not null,
  category text not null,
  status text check (status in ('completed', 'ongoing')),
  scope text,
  bid_outcome text check (bid_outcome in ('won', 'lost')),
  location text,
  country text not null default 'India',
  international boolean not null default false,
  client text,
  architect text,
  area text,
  height text,
  structural_system text,
  specs jsonb,
  summary text,
  challenge text,
  solution text,
  images jsonb not null default '[]',   -- [{ "src": "...", "alt": "..." }]
  featured boolean not null default false,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.articles (
  slug text primary key,
  legacy_id uuid,
  title text not null,
  excerpt text not null,
  body jsonb not null,                  -- ArticleBlock[] (see src/content/schema.ts)
  image jsonb not null,
  author text,
  category text not null,
  published_at timestamptz not null,
  related_projects text[] not null default '{}',
  featured boolean not null default false,
  published boolean not null default false
);

create table if not exists public.jobs (
  slug text primary key,
  legacy_id uuid,
  title text not null,
  department text not null,
  location text not null,
  locations text[] not null default '{}',
  work_mode text,
  employment_type text not null default 'FULL_TIME',
  experience text,
  summary text,
  responsibilities jsonb not null,      -- [{ "heading": "...", "items": ["..."] }]
  qualifications text[] not null default '{}',
  software text[] not null default '{}',
  status text not null default 'open' check (status in ('open', 'closed')),
  published_at date not null,
  closing_date date
);

create table if not exists public.clients (
  name text primary key,
  logo text not null,
  website text,
  sector text,
  region text not null check (region in ('national', 'international')),
  featured boolean not null default false,
  logo_permission_confirmed boolean not null default false
);

alter table public.projects enable row level security;
alter table public.articles enable row level security;
alter table public.jobs enable row level security;
alter table public.clients enable row level security;

create policy "public read published projects" on public.projects for select using (published);
create policy "public read published articles" on public.articles for select using (published);
create policy "public read jobs" on public.jobs for select using (true);
create policy "public read approved clients" on public.clients for select using (logo_permission_confirmed);
