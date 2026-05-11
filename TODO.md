# Pre-Production Readiness TODOs

This document tracks all remaining tasks required before deploying `artfcl.com` to production (and setting up the staging environment).

## 1. Repository & Code Gaps
- [ ] **CI/CD for Staging**: Update `.github/workflows/ci.yml` and `docker.yml` to trigger on `develop` branch and push a `staging` tag.
- [ ] **Environment-Aware Behavior**: Add `NEXT_PUBLIC_APP_ENV` plumbing. Implement an SEO guard (e.g., `X-Robots-Tag: noindex` or `<meta name="robots" content="noindex">`) when not in production.
- [ ] **Production-Grade Next.js Config**: Add security headers (Strict-Transport-Security, X-Frame-Options, etc.), set `poweredByHeader: false`, and verify `images.remotePatterns` if using `next/image`.
- [ ] **Contact Form Hardening**: Implement server-side Zod validation, add a honeypot field (or Turnstile/hCaptcha) to prevent spam, and consider simple rate limiting.
- [ ] **Build & Runtime Smoke Tests**: Run `docker compose --env-file .env.local up --build` locally and verify the standalone build boots successfully without missing CSS/assets.
- [ ] **Legal & Content**: Add Privacy Policy and Imprint/Legal Notice pages (crucial for GDPR compliance if hosting in the EU).
- [ ] **Basic SEO & Metadata**: Verify favicon, OG image, social cards, sitemap.xml, and robots.txt exist.

## 2. Repository Hygiene
- [ ] **Gitignore check**: Ensure `.env*`, `.next/`, and `tsconfig.tsbuildinfo` are fully gitignored and removed from git cache if necessary.
- [ ] **Branch Protection**: Setup branch protection rules for `main` requiring PR reviews and passing CI checks.
- [ ] **Dependabot**: Verify `.github/dependabot.yml` covers both `npm` and `github-actions`.
- [ ] **Documentation**: Create a `SECURITY.md` or `DEPLOY.md` detailing the secrets rotation runbook.

## 3. Server & Infrastructure (Hetzner)
- [ ] **Provision Server**: Spin up a Hetzner Cloud CX22 or CPX21 instance (Ubuntu 24.04 LTS).
- [ ] **OS Hardening**: Enable key-only SSH, disable root login, install fail2ban, enable unattended-upgrades, and configure swap space.
- [ ] **Firewall**: Configure Hetzner Cloud Firewall to only allow ports 22, 80, and 443. Keep Dokploy admin port restricted.
- [ ] **Install Dokploy**: Install via their official script and set up strong admin credentials / 2FA.
- [ ] **Registry Access**: Create a GitHub PAT (`read:packages`) and add it to Dokploy to pull private GHCR images.

## 4. DNS & Domain
- [ ] **A/AAAA Records**: Point apex (`artfcl.com`), `www`, and `staging.artfcl.com` to the Hetzner server IP.
- [ ] **Resend DNS**: Configure MX, SPF, DKIM, and DMARC records for the verified sending domain.
- [ ] **SSL Certificates**: Verify Traefik/Dokploy issues Let's Encrypt certificates successfully for all subdomains.

## 5. Secrets & Environment
- [ ] **Finalize Secret Store Choice**: Decide between Dokploy UI (Option A), self-hosted Infisical (Option B1), or Doppler (Option B2).
- [ ] **Generate Production Keys**: Create a domain-scoped, send-only Resend API key for production. Set `CONTACT_TO_EMAIL`.
- [ ] **Generate Staging Keys**: Create a separate Resend API key (or use a different sender address/domain) for staging.
- [ ] **Rotation Runbook**: Document the exact steps required to rotate the Resend API key in under 5 minutes.

## 6. Operational Readiness & Pre-Launch Validation
- [ ] **Uptime Monitoring**: Setup a ping service (UptimeRobot, Better Stack) hitting `/api/health`.
- [ ] **Rollback Test**: Push a broken deployment to staging, roll it back via Dokploy, and confirm the rollback functions perfectly.
- [ ] **Staging Soak**: Keep staging live and stable for 48-72 hours.
- [ ] **Lighthouse Check**: Ensure mobile score ≥ 90 on the production-equivalent build.
- [ ] **End-to-End Test**: Submit a real contact form via the staging URL and verify the email arrives in the destination inbox.

## 7. Observability & Analytics (Sentry + PostHog)
- [ ] **Sentry Integration**: Install `@sentry/nextjs` via wizard, configure `SENTRY_DSN` for staging/prod, and ensure source maps are uploaded correctly in the Docker build.
- [ ] **PostHog Integration**: Install `posthog-js`, wrap the app in a `PostHogProvider`, and add `NEXT_PUBLIC_POSTHOG_KEY`.
- [ ] **Cookie Consent Banner**: Implement a cookie consent banner (e.g., CookieConsent v3 or Klaro!) to gate PostHog initialization and stay GDPR compliant.
- [ ] **Legal Disclosures**: Ensure the Privacy Policy explicitly covers Sentry (error tracking), PostHog (analytics/session replay), and your chosen cookie banner logic.
- [ ] **Secrets Updates**: Add Sentry and PostHog API keys to your secret store strategy (Dokploy Env or Infisical).
