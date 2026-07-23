alter table public.learning_entitlements
  add column if not exists source_ref text;

create unique index if not exists learning_entitlements_source_ref_idx
  on public.learning_entitlements (source_ref)
  where source_ref is not null;

create table if not exists public.stripe_purchases (
  checkout_session_id text primary key,
  user_id uuid not null references auth.users (id) on delete restrict,
  purchaser_email text not null,
  product_id text not null check (product_id in ('toolkit')),
  payment_intent_id text,
  amount_total bigint,
  currency text,
  payment_status text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.stripe_webhook_events (
  event_id text primary key,
  event_type text not null,
  checkout_session_id text not null,
  processed_at timestamptz not null default now()
);

alter table public.stripe_purchases enable row level security;
alter table public.stripe_webhook_events enable row level security;

revoke all on table public.stripe_purchases from anon, authenticated;
revoke all on table public.stripe_webhook_events from anon, authenticated;

create or replace function public.fulfill_toolkit_purchase(
  p_event_id text,
  p_event_type text,
  p_checkout_session_id text,
  p_user_id uuid,
  p_purchaser_email text,
  p_payment_intent_id text,
  p_amount_total bigint,
  p_currency text,
  p_payment_status text
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_email text;
begin
  if p_payment_status not in ('paid', 'no_payment_required') then
    raise exception 'Payment is not complete'
      using errcode = 'check_violation';
  end if;

  select lower(email)
    into v_user_email
    from auth.users
   where id = p_user_id
     and email_confirmed_at is not null;

  if v_user_email is null or v_user_email <> lower(p_purchaser_email) then
    raise exception 'Purchaser identity does not match'
      using errcode = 'insufficient_privilege';
  end if;

  insert into public.stripe_webhook_events (
    event_id,
    event_type,
    checkout_session_id
  )
  values (p_event_id, p_event_type, p_checkout_session_id)
  on conflict (event_id) do nothing;

  if not found then
    return 'duplicate';
  end if;

  insert into public.stripe_purchases (
    checkout_session_id,
    user_id,
    purchaser_email,
    product_id,
    payment_intent_id,
    amount_total,
    currency,
    payment_status
  )
  values (
    p_checkout_session_id,
    p_user_id,
    lower(p_purchaser_email),
    'toolkit',
    p_payment_intent_id,
    p_amount_total,
    lower(p_currency),
    p_payment_status
  )
  on conflict (checkout_session_id)
  do update set
    payment_intent_id = excluded.payment_intent_id,
    amount_total = excluded.amount_total,
    currency = excluded.currency,
    payment_status = excluded.payment_status,
    updated_at = now();

  insert into public.learning_entitlements (
    user_id,
    product_id,
    source,
    source_ref,
    granted_at,
    revoked_at
  )
  values (
    p_user_id,
    'toolkit',
    'purchase',
    p_checkout_session_id,
    now(),
    null
  )
  on conflict (user_id, product_id)
  do update set
    source = 'purchase',
    source_ref = excluded.source_ref,
    granted_at = now(),
    revoked_at = null;

  return 'fulfilled';
end;
$$;

revoke all on function public.fulfill_toolkit_purchase(
  text, text, text, uuid, text, text, bigint, text, text
) from public, anon, authenticated;
grant execute on function public.fulfill_toolkit_purchase(
  text, text, text, uuid, text, text, bigint, text, text
) to service_role;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'learning-pdfs',
  'learning-pdfs',
  false,
  52428800,
  array['application/pdf']
)
on conflict (id)
do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
