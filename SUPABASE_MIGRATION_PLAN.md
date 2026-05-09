# New Generation Health Center Supabase Migration Plan

## 1. Architecture Explanation

### Current backend responsibilities

- Admin authentication and session management
- CMS content storage and update APIs
- Services and doctors CRUD endpoints
- Appointment submission and admin management
- Contact message submission and admin management
- Newsletter subscription capture
- Image upload handling
- Public content delivery API

### What moves to Supabase

- Authentication and admin session management via Supabase Auth
- Public and admin-protected database tables for services, doctors, appointments, messages, newsletter subscriptions, and CMS content
- Row level security and role-based access controls
- Direct SDK access from React for public read/write operations
- Minimal API abstraction with typed service wrappers in `src/services`

### What moves to Cloudinary

- All CMS asset uploads and image hosting for doctor portraits, service visuals, page banners, and hero images
- Responsive CDN-optimized image delivery via Cloudinary transformation URLs
- Direct browser uploads using upload presets from the admin panel

### What remains frontend-only

- UI rendering, page navigation, hash-based routing, and admin user experience
- Validation, animations, lazy-loading, and responsive presentation
- Local-only session state and auth flow control
- Client-side SDK integration for Supabase and Cloudinary

### Why this architecture

- Supabase frees the app from a custom Node backend and supports secure frontend-first access
- Cloudinary keeps image handling optimized while minimizing Supabase storage cost
- The frontend remains lightweight and performant for Cloudflare Pages deployment
- Type safety and simple service wrappers keep the codebase maintainable

## 2. Folder Structure

Recommended new folder structure:

- src/
  - lib/
    - supabase.ts
    - cloudinary.ts
  - types/
    - index.ts
    - content.ts
    - supabase.ts
  - services/
    - index.ts
    - auth.ts
    - content.ts
    - doctors.ts
    - services.ts
    - appointments.ts
    - messages.ts
    - newsletter.ts
  - hooks/
    - useSupabaseAuth.ts
    - useCloudinaryUpload.ts
  - utils/
    - validators.ts
  - admin/
    - CMS.tsx
    - Login.tsx
    - Dashboard.tsx
    - Appointments.tsx
    - Messages.tsx
    - Doctors.tsx
    - Services.tsx
  - pages/
    - LandingPage.tsx
    - AboutPage.tsx
    - ContactPage.tsx
  - components/
  - constants/
  - assets/

This structure separates backend adapters, typed models, service logic, reusable hooks, and UI pages.

## 3. SQL Schema

```sql
-- Enable UUID generation in Supabase
create extension if not exists "pgcrypto";

-- Admin users table linked to Supabase Auth
create table public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  name text,
  role text not null default 'admin',
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Public services
create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);
create index public.idx_services_title on public.services(title);

-- Public doctors
create table public.doctors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text,
  experience text,
  image_url text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);
create index public.idx_doctors_name on public.doctors(name);

-- Appointment requests created by website visitors
create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text not null,
  service_id uuid references public.services(id) on delete set null,
  date date,
  time text,
  message text,
  type text not null default 'consultation' check (type in ('consultation', 'quote')),
  status text not null default 'Pending' check (status in ('Pending','Contacted','Completed')),
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);
create index public.idx_appointments_status on public.appointments(status);
create index public.idx_appointments_service_id on public.appointments(service_id);

-- Contact messages submitted by visitors
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);
create index public.idx_messages_email on public.messages(email);

-- Newsletter subscription list with unique emails
create table public.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Dynamic CMS content sections stored as JSON
create table public.site_content (
  key text primary key,
  content jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);
```

## 4. Security Policies

### Recommended row-level security policy strategy

- Public reads allowed only for `services`, `doctors`, and `site_content`
- Public writes allowed only for `appointments`, `messages`, and `newsletter_subscriptions`
- Admin-only writes/updates/deletes on all protected tables using `admin_users`
- No service_role key in frontend; use anon key only

### Example RLS policies

```sql
-- Enable RLS
alter table public.admin_users enable row level security;
alter table public.services enable row level security;
alter table public.doctors enable row level security;
alter table public.appointments enable row level security;
alter table public.messages enable row level security;
alter table public.newsletter_subscriptions enable row level security;
alter table public.site_content enable row level security;

-- Public content read policies
create policy "Public select on services" on public.services for select using (true);
create policy "Public select on doctors" on public.doctors for select using (true);
create policy "Public select on site content" on public.site_content for select using (true);

-- Public insert policies for visitor actions
create policy "Allow anonymous appointment insert" on public.appointments for insert with check (
  auth.uid() is null and
  type in ('consultation','quote') and
  status = 'Pending'
);
create policy "Allow anonymous message insert" on public.messages for insert with check (
  auth.uid() is null
);
create policy "Allow anonymous newsletter insert" on public.newsletter_subscriptions for insert with check (
  auth.uid() is null
);

-- Admin-only policy helper
create function public.is_admin() returns boolean stable language sql as $$
  select exists(
    select 1 from public.admin_users
    where id = auth.uid() and role = 'admin'
  )
$$;

-- Admin-only policies
create policy "Admin full access to admin_users" on public.admin_users for all using (public.is_admin());
create policy "Admin full access to services" on public.services for all using (public.is_admin());
create policy "Admin full access to doctors" on public.doctors for all using (public.is_admin());
create policy "Admin full access to appointments" on public.appointments for all using (public.is_admin());
create policy "Admin full access to messages" on public.messages for all using (public.is_admin());
create policy "Admin full access to newsletter subscriptions" on public.newsletter_subscriptions for all using (public.is_admin());
create policy "Admin full access to site content" on public.site_content for all using (public.is_admin());

-- Allow authenticated admin to update their own row
create policy "Admin can update own profile" on public.admin_users for update using (
  public.is_admin() and id = auth.uid()
);
```

## 5. Environment Setup

### Required environment variables

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`

### Example `.env.example`

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

> Note: Do not commit secrets or service_role keys. Only the anon public key may be used in the frontend.

## 6. Initial Implementation Files

Created the foundational files for the migration:

- `src/lib/supabase.ts`
- `src/lib/cloudinary.ts`
- `src/types/supabase.ts`
- `src/types/content.ts`
- `src/types/index.ts`
- `src/services/auth.ts`
- `src/services/content.ts`
- `src/services/doctors.ts`
- `src/services/services.ts`
- `src/services/appointments.ts`
- `src/services/messages.ts`
- `src/services/newsletter.ts`
- `src/services/index.ts`
- `src/hooks/useSupabaseAuth.ts`
- `src/hooks/useCloudinaryUpload.ts`
- `src/utils/validators.ts`

## 7. Migration Roadmap

### Phase 1: Foundation

1. Install Supabase and Cloudinary packages.
2. Add environment variables and verify `.env.example`.
3. Add Supabase client and Cloudinary upload wrappers.
4. Add typed service layer and reusable hooks.

### Phase 2: Database migration

1. Create new Supabase tables with UUID keys, timestamps, and indexes.
2. Enable RLS and deploy secure public/admin policies.
3. Seed `site_content` rows for `global`, `landing_page`, `about_page`, and `contact_page`.
4. Add an initial admin user in Supabase Auth and `admin_users` table.

### Phase 3: Frontend migration

1. Replace existing custom `src/api` backend calls with `src/services` Supabase wrappers.
2. Migrate content API to `site_content` and remove backend content endpoints.
3. Migrate doctor and service pages to fetch from Supabase.
4. Migrate appointment, message, and newsletter submission forms to Supabase inserts.

### Phase 4: Cloudinary integration

1. Build direct Cloudinary upload for admin image fields.
2. Store returned Cloudinary secure URLs in Supabase rows.
3. Use `buildCloudinaryImageUrl` helper to deliver optimized images.

### Phase 5: Launch and optimization

1. Test admin authentication and RLS enforcement.
2. Verify all public pages load via Supabase queries only.
3. Audit image payloads for lazy-loading and Cloudinary transformations.
4. Deploy to Cloudflare Pages with only frontend assets and environment variables.

### Risk reduction strategy

- Keep both old API and new Supabase service layer side-by-side during migration.
- Migrate one domain at a time: CMS → services/doctors → forms.
- Validate with admin-only Supabase credentials before switching public routes.
- Use Supabase row-level security from day one.

### Free-tier optimization strategy

- Avoid a custom backend and use Supabase direct SDK access.
- Use Cloudinary for image CDN and automatic format/quality.
- Store CMS content in a single `site_content` table to reduce read operations.
- Index only required text fields and avoid unnecessary join-heavy tables.
- Deliver only needed columns and use server-side filtering for admin queries.

### Performance best practices

- Lazy-load hero images and admin media previews.
- Use Cloudinary `f_auto,q_auto` transformations for responsive assets.
- Cache public page content in-memory where appropriate.
- Keep service wrappers small and focused.
- Maintain mobile-first styling and a responsive page layout.
