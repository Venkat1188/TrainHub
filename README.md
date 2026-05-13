# TrainHub Institute

A full-stack Next.js 16 marketing and registration site for a professional training institute. Visitors browse a catalog of 13 courses, register through a Stripe-powered checkout, and the operations team reviews paid registrations on a Basic Auth–protected admin dashboard. Confirmation emails are sent automatically through Resend.

Live demo: run locally — see [Quick start](#quick-start).

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) **16.2.6** (App Router, Server Components) |
| Language | [TypeScript](https://www.typescriptlang.org/) **5.x** |
| UI | [React](https://react.dev/) **19.2.4** |
| Styling | [Tailwind CSS](https://tailwindcss.com/) **v4** (`@theme` tokens, `container-x` utility) |
| Payments | [Stripe](https://stripe.com/) Checkout (`stripe` ^22, `@stripe/stripe-js` ^9) |
| Email | [Resend](https://resend.com/) (`resend` ^6) |
| Lint | ESLint 9 + `eslint-config-next` |
| Auth (admin) | HTTP Basic Auth via Next.js middleware (`src/proxy.ts`) |
| Storage | SQLite via `@libsql/client` (local file by default, swappable to [Turso](https://turso.tech/) for serverless) |

> **Note on Next.js 16:** middleware is named `proxy.ts` (not `middleware.ts`), `params` and `searchParams` are `Promise`-based in route handlers and pages, and there is **no** `next/font` Geist import. See [`AGENTS.md`](./AGENTS.md).

---

## Software requirements

To run the project locally you need:

| Software | Version | Why |
|---|---|---|
| **Node.js** | **≥ 20.x LTS** (tested on 20 and 22) | Next.js 16 requires Node 20+ |
| **npm** | **≥ 10.x** (ships with Node 20) | Package install + scripts |
| **Git** | any recent | Clone the repo |

Optional but recommended:

| Software | Why |
|---|---|
| **Stripe CLI** ([install](https://docs.stripe.com/stripe-cli)) | Forward webhook events to `http://localhost:3000/api/webhook` during development |
| **Stripe account** (test mode) | Real Checkout sessions; without it the registration flow returns a 500 with a clear error |
| **Resend account** + verified sender domain | Sending real confirmation emails; without it emails are logged to the console instead |
| **VS Code** + ESLint extension | Inline lint feedback |
| **Windows PowerShell 5.1+** *or* **PowerShell 7+** | Required only for `scripts/download-images.ps1` (re-fetch the seeded image set) |

No database, no Docker, no Redis required.

---

## Quick start

```bash
# 1. Clone
git clone https://github.com/Venkat1188/TrainHub.git
cd TrainHub

# 2. Install dependencies
npm install

# 3. Create local env file (see "Environment variables" below)
#    Windows PowerShell:
New-Item -ItemType File -Path .env.local
#    macOS / Linux:
touch .env.local

# 4. Run the dev server
npm run dev
```

Open <http://localhost:3000> — the home page should render with hero, course grid, testimonials, and footer.

The admin dashboard lives at <http://localhost:3000/admin/registrations> and prompts for Basic Auth (default credentials below).

---

## Environment variables

All variables live in `.env.local` at the project root. This file is git-ignored — never commit it.

| Variable | Required for | Example | Notes |
|---|---|---|---|
| `ADMIN_USERNAME` | Admin dashboard | `admin` | Used by `src/proxy.ts` Basic Auth |
| `ADMIN_PASSWORD` | Admin dashboard | `admin` | Change before deploying anywhere public |
| `PAYMENTS_ENABLED` | Optional | `false` (default) | **Phase 1**: leave unset/`false` for direct registrations + email. Set to `true` to switch the registration form to the Stripe checkout flow (Phase 2). |
| `STRIPE_SECRET_KEY` | Phase 2 checkout + webhook | `sk_test_…` | Only needed when `PAYMENTS_ENABLED=true`. Get from <https://dashboard.stripe.com/test/apikeys> |
| `STRIPE_WEBHOOK_SECRET` | Phase 2 webhook signature verification | `whsec_…` | Only needed when `PAYMENTS_ENABLED=true`. Printed by `stripe listen` (see below) |
| `NEXT_PUBLIC_SITE_URL` | Optional | `http://localhost:3000` | Used to build absolute Stripe success/cancel URLs (Phase 2); auto-derived from request headers if unset |
| `RESEND_API_KEY` | Confirmation emails | `re_…` | Get from <https://resend.com/api-keys>; if unset, email content is logged to the dev console |
| `EMAIL_FROM` | Confirmation emails | `TrainHub <hello@yourdomain.com>` | Must be a verified sender on Resend |
| `EMAIL_REPLY_TO` | Optional | `support@yourdomain.com` | Adds a Reply-To header on confirmations; also the destination for inquiry notifications |
| `DATABASE_URL` | Optional | `file:./data/app.db` | Defaults to a local SQLite file. Set to `libsql://<your-db>.turso.io` to use Turso |
| `DATABASE_AUTH_TOKEN` | Only with Turso | `eyJ…` | Auth token issued by `turso db tokens create <db>` |

### Minimal `.env.local` to get the app running locally

```dotenv
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
```

That's enough to load every public page and the admin dashboard. The checkout will return a configuration error until you add the Stripe keys.

### Full `.env.local` for end-to-end testing

```dotenv
# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=replace-me-with-a-strong-password

# Phase 1 (default): direct registrations, no online payment.
# Set to true to enable Stripe checkout (Phase 2) — requires the STRIPE_* vars below.
PAYMENTS_ENABLED=false

# Stripe (only required when PAYMENTS_ENABLED=true)
STRIPE_SECRET_KEY=<your-stripe-test-secret-key>
STRIPE_WEBHOOK_SECRET=<your-webhook-signing-secret>
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Resend (optional; falls back to console logging)
RESEND_API_KEY=<your-resend-api-key>
EMAIL_FROM=TrainHub <hello@yourdomain.com>
EMAIL_REPLY_TO=support@yourdomain.com

# Storage (optional; defaults to local SQLite file at data/app.db)
# Uncomment for Turso (cloud SQLite, free tier, works on serverless):
# DATABASE_URL=libsql://<your-db>.turso.io
# DATABASE_AUTH_TOKEN=<your-turso-auth-token>
```

After editing `.env.local`, restart `npm run dev` so Next.js reloads the values.

---

## Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Next.js dev server with hot reload on `http://localhost:3000` |
| `npm run build` | Production build (`.next/` output) — also runs the type checker |
| `npm run start` | Serve the production build (run `npm run build` first) |
| `npm run lint` | ESLint over the project |

---

## Project structure

```
training-institute-clone/
├── data/                          # Git-ignored. SQLite database (app.db) + WAL files; legacy registrations.json auto-imported once
├── public/
│   └── images/                    # 30 local image assets
│       ├── about/                 # Team & training photos (2)
│       ├── avatars/               # Testimonial avatars (5, JPEG)
│       ├── blog/                  # Article hero images (6)
│       ├── courses/               # Course thumbnails (13, one per slug)
│       └── logos/                 # Partner logos (6, SVG)
├── scripts/
│   └── download-images.ps1        # Idempotent re-fetch of the seeded image set
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── about/                 # /about
│   │   ├── admin/
│   │   │   ├── registrations/     # /admin/registrations  (Basic-Auth protected)
│   │   │   └── inquiries/         # /admin/inquiries      (Basic-Auth protected)
│   │   ├── api/
│   │   │   ├── checkout/          # POST /api/checkout    (Phase 2: creates Stripe session)
│   │   │   ├── contact/           # POST /api/contact     (saves inquiry, honeypot + rate limit)
│   │   │   ├── register/          # POST /api/register    (Phase 1: direct registration + email)
│   │   │   └── webhook/           # POST /api/webhook     (Phase 2: Stripe → store + email)
│   │   ├── blog/                  # /blog
│   │   ├── categories/            # /categories
│   │   ├── consultancy/           # /consultancy
│   │   ├── contact/               # /contact
│   │   ├── courses/
│   │   │   ├── [slug]/            # /courses/<slug>
│   │   │   │   └── register/      # /courses/<slug>/register
│   │   │   └── page.tsx           # /courses (listing)
│   │   ├── group-rates/           # /group-rates
│   │   ├── locations/             # /locations
│   │   ├── online-courses/        # /online-courses
│   │   ├── payment/               # Phase 2 landing pages
│   │   │   ├── cancel/            # /payment/cancel
│   │   │   └── success/           # /payment/success
│   │   ├── register/
│   │   │   └── success/           # /register/success     (Phase 1 confirmation page)
│   │   ├── skills/                # /skills
│   │   ├── globals.css            # Tailwind v4 @theme tokens, container-x utility
│   │   ├── layout.tsx             # Root layout (Inter font, Header, Footer)
│   │   └── page.tsx               # Home page
│   ├── components/                # Reusable + page-specific components
│   │   ├── home/                  # Hero, Testimonials, TrustedBy, etc.
│   │   ├── AdminTabs.tsx          # Tab nav between /admin/registrations and /admin/inquiries
│   │   ├── ContactForm.tsx        # Client form with honeypot, POSTs /api/contact
│   │   ├── Header.tsx             # Sticky top nav (xl: full nav, < xl: hamburger)
│   │   ├── Footer.tsx
│   │   ├── CourseCard.tsx
│   │   ├── Placeholder.tsx        # Local image with gradient fallback
│   │   ├── RegistrationForm.tsx   # POSTs to /api/checkout
│   │   └── …
│   ├── lib/
│   │   ├── courses.ts             # 13-course catalog + filtering helpers
│   │   ├── db.ts                  # libsql/SQLite singleton + schema bootstrap
│   │   ├── email.ts               # Resend integration with console fallback
│   │   ├── inquiries.ts           # CRUD for the contact-form inquiries table
│   │   └── registrations.ts       # SQL-backed store with dedupe + JSON migration
│   └── proxy.ts                   # Next.js 16 middleware (Basic Auth on /admin/*)
├── AGENTS.md                      # Next.js 16 specific rules for AI agents
├── CLAUDE.md                      # → AGENTS.md
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## Routes overview

### Public pages
`/` · `/about` · `/categories` · `/skills` · `/locations` · `/courses` · `/courses/[slug]` · `/courses/[slug]/register` · `/online-courses` · `/group-rates` · `/consultancy` · `/blog` · `/contact` · `/register/success` · `/payment/success` · `/payment/cancel`

### Admin (Basic Auth)
`/admin/registrations` — table of all registrations (Phase 1 direct + Phase 2 Stripe-paid)
`/admin/inquiries` — table of all contact-form inquiries from the `inquiries` table

### API
`POST /api/register` — **Phase 1**. Body `{ courseSlug, participant, billing, notes }` → `{ ok: true, redirectUrl }`. Validates, persists with `paymentStatus: 'confirmed'`, sends a "registration received" email.
`POST /api/checkout` — **Phase 2** (only when `PAYMENTS_ENABLED=true`). Same body → `{ url, id }` (Stripe Checkout Session URL).
`POST /api/contact` — body `{ fullName, email, phone?, subject?, message, website? }` → `{ ok: true }` (429 if rate-limited, 400 on validation error)
`POST /api/webhook` — **Phase 2**. Stripe-signed event, persists registration on `checkout.session.completed`.

---

## Feature deep-dives

### Registration flow — Phase 1 (default) vs Phase 2

The registration form at `/courses/<slug>/register` has two modes selected by the `PAYMENTS_ENABLED` env var, which the page reads server-side and passes to `RegistrationForm` as a prop:

| Mode | `PAYMENTS_ENABLED` | Endpoint | After submit | Stored `paymentStatus` |
|---|---|---|---|---|
| **Phase 1 — direct registration** *(default)* | unset or `false` | `POST /api/register` | Redirect to `/register/success?course=<slug>` | `confirmed` |
| **Phase 2 — Stripe checkout** | `true` | `POST /api/checkout` | Redirect to Stripe-hosted payment, then `/payment/success` | `paid` (set by webhook) |

In **both modes** the registration lands in the same `registrations` table and shows up at `/admin/registrations`. The status pill colours `paid` and `confirmed` green, `pending` and `unpaid` amber.

### Phase 1: direct registration flow

1. User completes the form on `/courses/<slug>/register`.
2. Browser POSTs to `/api/register` (`src/app/api/register/route.ts`).
3. Handler validates, rate-limits (5/IP/10 min), and writes a `StoredRegistration` row with `paymentStatus: 'confirmed'`, `stripeSessionId: 'manual_<uuid>'`, and the course fee in cents.
4. `sendConfirmationEmail()` sends a "registration received — we'll be in touch" email (no Stripe reference shown). Falls back to console logging if Resend isn't configured.
5. Browser is redirected to `/register/success?course=<slug>` showing next-steps and an invoicing notice.

To switch to Phase 2 later: set `PAYMENTS_ENABLED=true`, add the `STRIPE_*` env vars, restart. No code changes needed.

### Phase 2: Stripe checkout flow

1. User completes the form on `/courses/<slug>/register`.
2. Browser POSTs to `/api/checkout` (`src/app/api/checkout/route.ts`).
3. Handler creates a Stripe Checkout Session priced from `course.feeUSD` and returns `session.url`.
4. Browser redirects to Stripe's hosted checkout.
5. On success, Stripe redirects back to `/payment/success?session_id=…&course=<slug>`.
6. Asynchronously, Stripe POSTs `checkout.session.completed` to `/api/webhook`.
7. The webhook verifies the signature, calls `appendRegistration()` (dedupe by `stripeSessionId`), then `sendConfirmationEmail()`.

#### Test the webhook locally with the Stripe CLI

```bash
# In one terminal (the dev server)
npm run dev

# In another terminal — install the Stripe CLI first
stripe login
stripe listen --forward-to http://localhost:3000/api/webhook
# Copy the printed `whsec_…` into STRIPE_WEBHOOK_SECRET in .env.local, then restart `npm run dev`

# Trigger a fake completed checkout
stripe trigger checkout.session.completed
```

Use Stripe's test card `4242 4242 4242 4242` with any future expiry and any CVC.

### Admin dashboard

`src/proxy.ts` matches `/admin/:path*` and gates the route with HTTP Basic Auth using `ADMIN_USERNAME` / `ADMIN_PASSWORD`. Comparison is constant-time. The page reads `data/registrations.json` server-side and renders a table with course, participant, organisation, amount, and Stripe references.

### Confirmation emails

`src/lib/email.ts` builds a plain-text and HTML version of the confirmation message and sends them via Resend. If `RESEND_API_KEY` or `EMAIL_FROM` is missing, the email payload is logged to the server console instead so local development never fails.

### Contact form & inquiries

The public `/contact` page renders `ContactForm` (client component) which POSTs JSON to `/api/contact`. The handler:

1. Rejects requests where the hidden honeypot `website` field is filled (returns `200 {ok:true}` so bots don't learn).
2. Enforces a per-IP rate limit of **3 submissions per 10 minutes** via an in-memory token bucket (resets on server restart).
3. Validates name (≥ 2 chars), email (regex), and message (≥ 10 chars) — returns `400` with a friendly error otherwise.
4. Persists the row via `appendInquiry()` into the SQLite `inquiries` table.
5. If Resend is configured, sends a notification to `EMAIL_REPLY_TO` (or `EMAIL_FROM`) with the visitor's email as `Reply-To`. Otherwise logs to the server console.

All inquiries are visible at `/admin/inquiries` (Basic-Auth protected, sorted newest-first, with `mailto:` and `tel:` links).

### Storage (SQLite via libsql)

`src/lib/db.ts` exposes a singleton `@libsql/client` connection. On first use it creates two tables (`registrations`, `inquiries`) if they don't exist, and one-shot imports `data/registrations.json` if present (idempotent — re-imports are skipped via `INSERT OR IGNORE` on `stripe_session_id`).

| Mode | `DATABASE_URL` | Notes |
|---|---|---|
| **Local file (default)** | unset, or `file:./data/app.db` | Best for dev. Persists across restarts. Git-ignored. |
| **Turso (cloud SQLite)** | `libsql://<your-db>.turso.io` + `DATABASE_AUTH_TOKEN` | Required for serverless hosts (Vercel, Netlify) where the local filesystem is read-only. Free tier handles this workload comfortably. |

To provision Turso:

```bash
# install once
curl -sSfL https://get.tur.so/install.sh | bash

turso auth login
turso db create trainhub
turso db show trainhub --url        # → DATABASE_URL
turso db tokens create trainhub     # → DATABASE_AUTH_TOKEN
```

No schema migration is needed — the tables are created on first connection.

### Image assets

All 30 images live under `public/images/` and are served as static files. To re-fetch the seeded set (e.g. after deleting a folder):

```powershell
powershell -NoLogo -NonInteractive -ExecutionPolicy Bypass -File scripts/download-images.ps1
```

Replace any file with your own JPEG/SVG using the same path and filename — components pick it up automatically.

---

## Production build

```bash
npm run build       # type-check + compile to .next/
npm run start       # serve on http://localhost:3000
```

For a step-by-step **Netlify + Turso** deployment, see [`DEPLOYMENT.md`](./DEPLOYMENT.md).

For a real deployment (Vercel, a Node host, or a container):

- Set every variable from the [Full `.env.local`](#full-envlocal-for-end-to-end-testing) example as a host-managed secret. Phase 1 only needs `ADMIN_*`, `RESEND_*`, `EMAIL_*` and (optionally) `DATABASE_*`.
- Leave `PAYMENTS_ENABLED` unset (or `false`) for Phase 1. Set it to `true` and add `STRIPE_*` once you're ready to flip on online payments.
- For Phase 2: set `STRIPE_WEBHOOK_SECRET` to the value from a **production** webhook endpoint registered in the Stripe Dashboard pointing at `https://your-domain/api/webhook`, and set `NEXT_PUBLIC_SITE_URL` to your public origin so Stripe success/cancel URLs are absolute.
- On serverless platforms (Vercel, Netlify) the local filesystem is read-only at runtime. Provision a Turso database and set `DATABASE_URL` + `DATABASE_AUTH_TOKEN` instead of relying on the default `file:./data/app.db`.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Register form returns "Stripe is not configured" | You set `PAYMENTS_ENABLED=true` but didn't add `STRIPE_SECRET_KEY` | Either add the Stripe keys, or unset `PAYMENTS_ENABLED` to use the Phase 1 direct flow |
| Webhook returns 400 "Webhook signature verification failed" | `STRIPE_WEBHOOK_SECRET` mismatch | Re-copy the value from `stripe listen` output and restart |
| Admin page returns 503 "Admin area is not configured" | `ADMIN_USERNAME` / `ADMIN_PASSWORD` missing | Add them to `.env.local` and restart |
| Browser keeps showing old credentials cached for `/admin/*` | Browser Basic-Auth cache | Open in a private window, or clear site data |
| Confirmation email never arrives | `RESEND_API_KEY` / `EMAIL_FROM` not set, or sender domain not verified on Resend | Check the dev console — the full message is logged on fallback |
| Build error mentioning `middleware.ts` | This project uses **`proxy.ts`** (Next.js 16) | Don't rename; see `AGENTS.md` |
| `/api/contact` returns 429 | More than 3 submissions from one IP within 10 minutes | Wait, or restart `npm run dev` to reset the in-memory bucket |
| `/admin/inquiries` is empty after submitting the form | Hidden honeypot `website` field was filled (browser autofill?) or rate-limited | Check the dev console for `[contact]` logs; clear browser autofill for that input |
| `SQLITE_CANTOPEN` / `unable to open database file` on first run | `data/` directory missing or not writable | The app creates `data/` automatically on first write — verify the project root is writable |
| Deployed app loses inquiries/registrations after each request | Default file-based SQLite on a read-only serverless FS | Set `DATABASE_URL=libsql://…` and `DATABASE_AUTH_TOKEN` for Turso |

---

## License

Private project — not currently licensed for redistribution.

