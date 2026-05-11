This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Setup Instructions

### Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### Contact Form (Resend)
The `/contact` form uses Resend to deliver emails.
1. Create a [Resend](https://resend.com) account.
2. Verify the `artfcl.com` domain in your Resend dashboard (requires adding DNS records).
3. Generate an API Key and place it in `.env.local` as `RESEND_API_KEY`.
4. The form sends from `CONTACT_FROM_EMAIL` (default: contact@artfcl.com) to `CONTACT_TO_EMAIL` (default: info@artfcl.com). Ensure the "FROM" email exists on your verified Resend domain.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Docker & Deployment

### Local Docker Build

You can run the application locally using Docker Compose. Since you are running locally, you should pass your local environment file:

```bash
docker compose --env-file .env.local up --build
```

This will build the production image and start the server at `http://localhost:3000`.

### CI/CD

This project uses GitHub Actions for continuous integration and deployment.
- **CI**: On every pull request and push to `main`, the code is linted, type-checked, and built to ensure nothing breaks.
- **Docker**: Pushes to `main` and tag releases (`v*`) automatically trigger a build that pushes the Docker image to GitHub Container Registry (ghcr.io).

### Server Deployment (Hetzner + Dokploy)

For production, the site is designed to be hosted on a Hetzner server managed via [Dokploy](https://dokploy.com/).

To deploy:
1. Ensure the GHCR package visibility for the image is configured so Dokploy can pull it (or provide Dokploy with a Personal Access Token).
2. Point your Dokploy application at `ghcr.io/<github-username>/web_app:latest`.
3. Set your production environment variables (e.g., `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`) in Dokploy.
4. *Webhook automation for auto-redeployment on push is planned for a later phase.*
