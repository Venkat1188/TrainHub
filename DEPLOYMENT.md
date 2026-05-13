# Deployment guide — Netlify + Turso

This guide deploys the project as-is (no code changes) to **Netlify** with **Turso** as the SQLite backend. It maps 1:1 to the env vars and code already in `src/lib/db.ts`, `src/lib/email.ts`, `src/proxy.ts`, and the `/api/*` routes.

For local development, env-var reference, and the Phase 1 vs Phase 2 registration flow, see [`README.md`](./README.md).

---

## 1. Prerequisites

| Tool | Why | Install |
|---|---|---|
| Node.js ≥ 20 LTS | Required by Next.js 16 | <https://nodejs.org> |
| Netlify CLI (optional) | Local link / env push | `npm i -g netlify-cli` |
| Turso CLI | Create the DB and tokens | `curl -sSfL https://get.tur.so/install.sh \| bash` (Linux/macOS) or `irm get.tur.so/install.ps1 \| iex` (Windows PS) |
| GitHub repo | Netlify's recommended deploy source | push this project to GitHub |

---

## 2. Provision Turso (cloud SQLite)

```bash
turso auth login

# Create the DB (pick a region near your Netlify region)
turso db create trainhub --location fra   # e.g. Frankfurt

# Get the connection URL
turso db show trainhub --url
# → libsql://trainhub-<org>.turso.io

# Create an auth token (long-lived recommended for prod)
turso db tokens create trainhub --expiration none
# → eyJhbGci...
```

No schema SQL is needed. `src/lib/db.ts` runs `bootstrap()` on first connection and creates the `registrations` and `inquiries` tables automatically.

(Optional) inspect from your laptop:

```bash
turso db shell trainhub
.tables
.schema registrations
.quit
```

---

## 3. Add a Netlify config to the repo

Netlify supports Next.js 16 via `@netlify/plugin-nextjs`. Pinning it in `netlify.toml` makes builds reproducible.

Create **`netlify.toml`** at the repo root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"
  NEXT_TELEMETRY_DISABLED = "1"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Notes:
- The Netlify Next.js runtime maps Next route handlers → Netlify Functions, and middleware (`src/proxy.ts`) → Netlify Edge Functions. The existing `proxy.ts` + matcher works as-is.
- Do **not** add `output: "export"` to `next.config.ts` — this app uses dynamic API routes and middleware, so it must run as a server build.
- Do **not** add `output: "standalone"` either — the Netlify adapter handles bundling.
- `.gitignore` already excludes `/.next/`, `.env*`, and `/data` (local SQLite + WAL files). Confirm before pushing.

---

## 4. Push to GitHub and connect to Netlify

1. Push the repo to GitHub.
2. In Netlify: **Add new site → Import from Git → pick the repo**.
3. Build settings (Netlify auto-detects, but verify):
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Functions directory:** *(leave blank — the plugin manages it)*
4. Don't deploy yet — set env vars first (next step).

---

## 5. Configure environment variables in Netlify

In **Site configuration → Environment variables** add these. Scope them to **All scopes** (Builds + Functions + Edge Functions + Runtime) unless noted, because:
- `DATABASE_URL` / `DATABASE_AUTH_TOKEN` are read by Functions (`/api/*`).
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` are read by the Edge middleware (`proxy.ts`).
- `NEXT_PUBLIC_SITE_URL` is needed at **build time** (it's inlined into the client bundle).

| Variable | Value | Required when |
|---|---|---|
| `DATABASE_URL` | `libsql://trainhub-<org>.turso.io` | always (default `file:` path is read-only on Netlify) |
| `DATABASE_AUTH_TOKEN` | the token from `turso db tokens create` | always |
| `ADMIN_USERNAME` | e.g. `admin` | always — without it `/admin/*` returns 503 |
| `ADMIN_PASSWORD` | a strong password | always |
| `NEXT_PUBLIC_SITE_URL` | `https://your-site.netlify.app` (or custom domain) | recommended — used by Stripe success/cancel URLs |
| `RESEND_API_KEY` | `re_...` | for real confirmation emails |
| `EMAIL_FROM` | `TrainHub <hello@yourdomain.com>` (verified Resend sender) | with Resend |
| `EMAIL_REPLY_TO` | `support@yourdomain.com` | optional |
| `PAYMENTS_ENABLED` | `false` for Phase 1; `true` to enable Stripe checkout | optional |
| `STRIPE_SECRET_KEY` | `sk_live_...` (or `sk_test_...`) | only when `PAYMENTS_ENABLED=true` |
| `STRIPE_WEBHOOK_SECRET` | from the prod webhook in Stripe Dashboard (see §7) | only when `PAYMENTS_ENABLED=true` |

CLI alternative (after `netlify link`):

```bash
netlify env:set DATABASE_URL "libsql://trainhub-<org>.turso.io"
netlify env:set DATABASE_AUTH_TOKEN "eyJ..."
# ...etc
```

---

## 6. First deploy

Trigger **Deploy site** from the Netlify UI (or `git push` to the main branch). Confirm in the build log:
- `Next.js 16.2.6` is detected.
- `@netlify/plugin-nextjs` runs and lists `proxy` as an Edge Function and `/api/checkout`, `/api/contact`, `/api/register`, `/api/webhook` as Functions.

Smoke tests once it's live:
1. `https://your-site.netlify.app/` → home renders.
2. `https://your-site.netlify.app/admin/registrations` → Basic Auth prompt; correct creds load the page (initially empty).
3. `POST /api/contact` from the `/contact` page → 200, then visible at `/admin/inquiries`.
4. (Phase 1) `POST /api/register` from a course's `/register` page → row appears at `/admin/registrations`.
5. In Turso CLI: `turso db shell trainhub "SELECT count(*) FROM inquiries;"` should reflect the test rows.

---

## 7. (Phase 2 only) Wire the production Stripe webhook

Once `PAYMENTS_ENABLED=true`:

1. Stripe Dashboard → **Developers → Webhooks → Add endpoint**:
   - URL: `https://your-site.netlify.app/api/webhook` (or your custom domain).
   - Events: at minimum `checkout.session.completed`.
2. Reveal the signing secret and set it in Netlify as `STRIPE_WEBHOOK_SECRET`.
3. Re-deploy (env-var changes don't auto-rebuild; trigger a new deploy from Netlify so Functions pick up the new value).
4. From Stripe Dashboard → "Send test webhook" for `checkout.session.completed`. The endpoint should return 200 and a row should appear at `/admin/registrations` with `paymentStatus: paid`.

---

## 8. Custom domain + HTTPS

In Netlify: **Domain management → Add a domain**, then either:
- Use Netlify DNS (simplest — automatic Let's Encrypt cert), or
- Point your registrar's `CNAME` (or `A`/`ALIAS` for apex) at the Netlify load balancer.

After the domain is live, update:
- `NEXT_PUBLIC_SITE_URL=https://your-domain.com` in Netlify env vars **and re-deploy** (this var is baked into the client bundle at build time).
- The Stripe webhook endpoint URL to use the custom domain.
- Resend's verified sender domain (DKIM/SPF records) if you're switching from a `netlify.app` test sender.

---

## 9. Operations cheatsheet

| Task | Command / Place |
|---|---|
| Tail prod logs | Netlify UI → **Logs → Functions** (and **Edge Functions** for `proxy`) |
| Re-deploy after env change | Netlify UI → **Deploys → Trigger deploy → Deploy site** |
| Inspect prod DB | `turso db shell trainhub` |
| Back up prod DB | `turso db shell trainhub ".dump" > backup.sql` |
| Rotate Turso token | `turso db tokens create trainhub --expiration none`, update `DATABASE_AUTH_TOKEN` in Netlify, redeploy, then `turso db tokens invalidate <old>` |
| Rotate admin password | Update `ADMIN_PASSWORD` in Netlify, redeploy, hard-refresh the browser to clear cached Basic-Auth |

---

## 10. Common pitfalls specific to this stack

- **`SQLITE_CANTOPEN` in Function logs** → `DATABASE_URL` not set (or set to `file:...`). Netlify's Function FS is read-only; you must use Turso.
- **`/admin/*` returns 503 "Admin area is not configured"** → `ADMIN_USERNAME` / `ADMIN_PASSWORD` missing from the **Edge Functions** scope. Re-check the variable scope in Netlify.
- **Stripe webhook returns 400 "signature verification failed"** → `STRIPE_WEBHOOK_SECRET` mismatched, or you didn't redeploy after setting it. Each webhook endpoint in Stripe has its own secret.
- **Confirmation emails never arrive** → Resend sender domain not verified, or `RESEND_API_KEY` missing. The code falls back to `console.log` — check Function logs to see the rendered email.
- **Stripe success/cancel URLs are `http://localhost:3000/...`** → `NEXT_PUBLIC_SITE_URL` not set at build time, or you changed it but didn't redeploy. It is a `NEXT_PUBLIC_*` variable, so it's frozen into the client bundle at build.
- **Don't rename `src/proxy.ts` to `middleware.ts`** — Next.js 16 in this project uses `proxy.ts`. The Netlify adapter handles it; renaming it will break the admin gate.
