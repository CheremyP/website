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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
