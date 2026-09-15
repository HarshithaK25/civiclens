create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.issues (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text not null,
  category text not null,
  severity text not null,
  location text not null,
  latitude double precision not null,
  longitude double precision not null,
  photo_url text,
  priority_score integer not null check (priority_score between 0 and 100),
  status text not null default 'Reported' check (status in ('Reported', 'Under Review', 'Assigned', 'In Progress', 'Resolved')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.issue_supports (
  issue_id uuid not null references public.issues(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (issue_id, user_id)
);

create table if not exists public.issue_updates (
  id uuid primary key default gen_random_uuid(),
  issue_id uuid not null references public.issues(id) on delete cascade,
  changed_by uuid not null references public.profiles(id) on delete cascade,
  from_status text,
  to_status text not null,
  note text,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$ begin
  insert into public.profiles (id, full_name) values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.issues enable row level security;
alter table public.issue_supports enable row level security;
alter table public.issue_updates enable row level security;

create policy "profiles are viewable by authenticated users" on public.profiles for select to authenticated using (true);
create policy "users can update own profile" on public.profiles for update to authenticated using (auth.uid() = id);
create policy "issues are publicly readable" on public.issues for select to anon, authenticated using (true);
create policy "authenticated users can create issues" on public.issues for insert to authenticated with check (auth.uid() = reporter_id);
create policy "reporters can update own issues" on public.issues for update to authenticated using (auth.uid() = reporter_id);
create policy "supports are publicly readable" on public.issue_supports for select to anon, authenticated using (true);
create policy "users can support once" on public.issue_supports for insert to authenticated with check (auth.uid() = user_id);
create policy "users can remove own support" on public.issue_supports for delete to authenticated using (auth.uid() = user_id);
create policy "issue updates are readable" on public.issue_updates for select to anon, authenticated using (true);

insert into storage.buckets (id, name, public) values ('issue-photos', 'issue-photos', true) on conflict (id) do nothing;
create policy "authenticated users can upload issue photos" on storage.objects for insert to authenticated with check (bucket_id = 'issue-photos' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "issue photos are public" on storage.objects for select to anon, authenticated using (bucket_id = 'issue-photos');
