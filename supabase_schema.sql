-- Users
create table users (
  id uuid primary key default gen_random_uuid(),
  phone text unique not null,
  name text,
  preferred_language text default 'hi',
  risk_profile text,
  created_at timestamptz default now()
);

-- FD Rates (scraped)
create table fd_rates (
  id serial primary key,
  bank_name text not null,
  tenor_days integer not null,
  rate_general numeric not null,
  rate_senior numeric,
  min_amount integer,
  scraped_at timestamptz default now()
);

-- User FD Bookings
create table fd_bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  bank_name text,
  amount numeric,
  tenor_days integer,
  rate numeric,
  maturity_date date,
  status text default 'active',
  booked_at timestamptz default now()
);

-- Goals
create table user_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  goal_type text,
  target_amount numeric,
  target_date date,
  created_at timestamptz default now()
);
