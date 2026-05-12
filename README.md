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
| Storage | File-based JSON (`data/registrations.json`) — swap for a DB in production |

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
| `STRIPE_SECRET_KEY` | Checkout + webhook | `sk_test_…` | Get from <https://dashboard.stripe.com/test/apikeys> |
| `STRIPE_WEBHOOK_SECRET` | Webhook signature verification | `whsec_…` | Printed by `stripe listen` (see below) |
| `NEXT_PUBLIC_SITE_URL` | Optional | `http://localhost:3000` | Used to build absolute Stripe success/cancel URLs; auto-derived from request headers if unset |
| `RESEND_API_KEY` | Confirmation emails | `re_…` | Get from <https://resend.com/api-keys>; if unset, email content is logged to the dev console |
| `EMAIL_FROM` | Confirmation emails | `TrainHub <hello@yourdomain.com>` | Must be a verified sender on Resend |
| `EMAIL_REPLY_TO` | Optional | `support@yourdomain.com` | Adds a Reply-To header |

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

# Stripe (test mode)
STRIPE_SECRET_KEY=<your-stripe-test-secret-key>
STRIPE_WEBHOOK_SECRET=<your-webhook-signing-secret>
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Resend (optional; falls back to console logging)
RESEND_API_KEY=<your-resend-api-key>
EMAIL_FROM=TrainHub <hello@yourdomain.com>
EMAIL_REPLY_TO=support@yourdomain.com
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
├── data/                          # Git-ignored. registrations.json written by the Stripe webhook
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
│   │   ├── admin/registrations/   # /admin/registrations  (Basic-Auth protected)
│   │   ├── api/
│   │   │   ├── checkout/          # POST /api/checkout    (creates Stripe session)
│   │   │   └── webhook/           # POST /api/webhook     (Stripe → store + email)
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
│   │   ├── payment/
│   │   │   ├── cancel/            # /payment/cancel
│   │   │   └── success/           # /payment/success
│   │   ├── skills/                # /skills
│   │   ├── globals.css            # Tailwind v4 @theme tokens, container-x utility
│   │   ├── layout.tsx             # Root layout (Inter font, Header, Footer)
│   │   └── page.tsx               # Home page
│   ├── components/                # Reusable + page-specific components
│   │   ├── home/                  # Hero, Testimonials, TrustedBy, etc.
│   │   ├── Header.tsx             # Sticky top nav (xl: full nav, < xl: hamburger)
│   │   ├── Footer.tsx
│   │   ├── CourseCard.tsx
│   │   ├── Placeholder.tsx        # Local image with gradient fallback
│   │   ├── RegistrationForm.tsx   # POSTs to /api/checkout
│   │   └── …
│   ├── lib/
│   │   ├── courses.ts             # 13-course catalog + filtering helpers
│   │   ├── email.ts               # Resend integration with console fallback
│   │   └── registrations.ts       # File-based JSON store with dedupe
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
`/` · `/about` · `/categories` · `/skills` · `/locations` · `/courses` · `/courses/[slug]` · `/courses/[slug]/register` · `/online-courses` · `/group-rates` · `/consultancy` · `/blog` · `/contact` · `/payment/success` · `/payment/cancel`

### Admin (Basic Auth)
`/admin/registrations` — table of all paid registrations from `data/registrations.json`

### API
`POST /api/checkout` — body `{ courseSlug, participant, billing, notes }` → `{ url, id }`
`POST /api/webhook` — Stripe-signed event, persists registration on `checkout.session.completed`

---

## Feature deep-dives

### Stripe checkout flow

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

For a real deployment (Vercel, a Node host, or a container):

- Set every variable from the [Full `.env.local`](#full-envlocal-for-end-to-end-testing) example as a host-managed secret.
- Set `STRIPE_WEBHOOK_SECRET` to the value from a **production** webhook endpoint registered in the Stripe Dashboard pointing at `https://your-domain/api/webhook`.
- Replace the file-based `data/registrations.json` with a real database (e.g. Postgres + Prisma) — file storage will not survive on serverless / read-only filesystems.
- Set `NEXT_PUBLIC_SITE_URL` to your public origin so Stripe success/cancel URLs are absolute.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `npm run dev` fails with "Stripe is not configured" on register submit | `STRIPE_SECRET_KEY` missing | Add it to `.env.local` and restart |
| Webhook returns 400 "Webhook signature verification failed" | `STRIPE_WEBHOOK_SECRET` mismatch | Re-copy the value from `stripe listen` output and restart |
| Admin page returns 503 "Admin area is not configured" | `ADMIN_USERNAME` / `ADMIN_PASSWORD` missing | Add them to `.env.local` and restart |
| Browser keeps showing old credentials cached for `/admin/*` | Browser Basic-Auth cache | Open in a private window, or clear site data |
| Confirmation email never arrives | `RESEND_API_KEY` / `EMAIL_FROM` not set, or sender domain not verified on Resend | Check the dev console — the full message is logged on fallback |
| Build error mentioning `middleware.ts` | This project uses **`proxy.ts`** (Next.js 16) | Don't rename; see `AGENTS.md` |

---

## License

Private project — not currently licensed for redistribution.

