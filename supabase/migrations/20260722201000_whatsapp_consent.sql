alter table if exists public.profiles
  add column if not exists whatsapp_opt_in_at timestamptz,
  add column if not exists whatsapp_opt_out_at timestamptz;

grant select (whatsapp_opt_in_at, whatsapp_opt_out_at) on public.profiles to authenticated;
grant update (phone, whatsapp_opt_in_at, whatsapp_opt_out_at, updated_at) on public.profiles to authenticated;
