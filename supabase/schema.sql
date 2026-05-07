-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)

create table if not exists waitlist (
  id bigint generated always as identity primary key,
  name text not null,
  trade text not null,
  contact text not null,
  contact_type text,
  source text default 'site',
  created_at timestamptz default now()
);

create table if not exists chase_status (
  lead_id text primary key,
  status text not null,
  sent_at timestamptz default now(),
  nudged boolean default false,
  updated_at timestamptz default now()
);

create table if not exists outcomes (
  lead_id text primary key,
  title text default 'Unknown job',
  status text not null,
  value text,
  lost_reason text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
