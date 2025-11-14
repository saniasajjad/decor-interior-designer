# Decor Server

## Run locally
```bash
npm install
npm run dev
```

## Optional: Connect Supabase (persistence)
Create a `.env` file next to `index.js`:
```
PORT=4000
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
# or for quick tests only
# SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

### Tables (SQL)
Run this SQL in Supabase:
```sql
-- users
create table if not exists users (
  email text primary key,
  name text not null,
  is_admin boolean default false,
  plan text default 'Free',
  free_generations_left integer default 3
);

-- galleries
create table if not exists galleries (
  id text primary key,
  email text not null references users(email) on delete cascade,
  original_image text not null,
  generated_image text not null,
  style text,
  prompt text,
  saved_at timestamptz default now()
);

-- orders
create table if not exists orders (
  id text primary key,
  service_name text not null,
  price text not null,
  status text not null,
  order_date timestamptz default now(),
  customer_name text not null,
  customer_email text not null references users(email) on delete set null
);

-- contact_info (single row)
create table if not exists contact_info (
  id int primary key default 1,
  address text,
  phone text,
  email text
);
```

## Client configuration
In the client `.env` set:
```
VITE_API_BASE=http://localhost:4000
VITE_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY
```
