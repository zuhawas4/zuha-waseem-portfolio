# Zuha Waseem — Portfolio

Personal portfolio site built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Run locally

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize content

Edit `src/data/content.ts` for name, bio, skills, projects, timeline, and social links.

## Project structure

```
src/
  app/           # App Router pages + global styles
  components/    # Hero, About, Skills, Projects, Experience, Contact, Footer, Navbar
  data/          # Portfolio copy and data
```

## Phases

- **Phase 1** — Portfolio frontend
- **Phase 2** — GitHub + Vercel deploy
- **Phase 3** — Supabase + Prisma + Contact API (current)
- **Phase 4+** — Resend, Auth, Admin dashboard, reCAPTCHA

## Phase 3 setup (database)

1. Create a free project at [supabase.com](https://supabase.com)
2. Copy `.env.example` → `.env.local` and fill in:
   - `DATABASE_URL` — Transaction pooler (port **6543**, add `?pgbouncer=true`)
   - `DIRECT_URL` — Direct/session connection (port **5432**)
   - Supabase URL + anon/service keys (for later phases)
3. Also copy `DATABASE_URL` and `DIRECT_URL` into a root `.env` file (Prisma CLI reads `.env`)
4. Run the migration:

```bash
npm run db:migrate -- --name init_contact
```

5. Start the app and submit the Contact form — rows should appear in Supabase → Table Editor → `Contact`

## Phase 4 setup (Resend email alerts)

1. Create an API key at [resend.com/api-keys](https://resend.com/api-keys)
2. Add to `.env` and `.env.local`:

```
RESEND_API_KEY=re_...
ADMIN_EMAIL=your-inbox@example.com
RESEND_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
```

3. With Resend's free onboarding sender, `ADMIN_EMAIL` must be the email on your Resend account.
4. Submit the contact form — you should get an email, and the row still saves even if email fails.
