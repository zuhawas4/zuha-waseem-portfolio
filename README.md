# Zuha Waseem — Portfolio

Personal portfolio with Contact API, Resend alerts, Supabase Auth admin dashboard, and reCAPTCHA-protected login.

**Stack:** Next.js (App Router) · TypeScript · Tailwind · Prisma · Supabase · Resend · reCAPTCHA v3

## Run locally

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` → `.env` and `.env.local`, then fill in Supabase, Resend, admin, and reCAPTCHA values.

## Database migrations

```bash
# Apply schema (Contact, Profile, LoginAttempt)
npx prisma migrate deploy
# or during development:
npx prisma migrate dev
npx prisma generate
```

## Seed the Admin account

1. In Supabase → **Authentication** → enable **Email** provider.
2. Set in `.env` / `.env.local`:

```
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD=at-least-8-chars
ADMIN_NAME=Zuha Waseem
```

3. Run:

```bash
npm run seed:admin
```

4. Open `/login` and sign in.

## Admin features

| Route | Purpose |
|-------|---------|
| `/login` | Admin login (reCAPTCHA + rate limit) |
| `/dashboard` | Stats + recent contacts |
| `/dashboard/contacts` | Full list + status dropdown |
| `PATCH /api/contacts/:id/status` | Update status (admin only) |

Statuses: `Pending` · `Done` · `Completed` · `Resolved`

## Project structure

```
src/
  app/
    api/contact          # public contact form API
    api/auth/login       # login + reCAPTCHA + rate limit
    api/contacts/[id]/status
    login/
    dashboard/           # protected admin UI
  components/            # portfolio sections + admin UI
  lib/                   # prisma, supabase, email, rate-limit, recaptcha
scripts/seed-admin.ts
prisma/
```

## reCAPTCHA (optional locally)

Without `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` / `RECAPTCHA_SECRET_KEY`, login still works (verification is skipped with a warning). For production, register v3 keys at https://www.google.com/recaptcha/admin and add them to Vercel env.
