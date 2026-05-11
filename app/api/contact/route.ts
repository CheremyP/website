import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/contact-schema';
import { checkRateLimit } from '@/lib/rate-limit';
import { ZodError } from 'zod';

export async function POST(request: Request) {
  try {
    // Fail fast if env vars are missing
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL || !process.env.CONTACT_TO_EMAIL) {
      console.error('CRITICAL: Missing Resend API configuration in environment variables.');
      return NextResponse.json({ error: 'Internal Server Error configuration' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // CSRF / Origin Check
    const origin = request.headers.get('origin');
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.artfcl.com'; // fallback for production
    if (process.env.NODE_ENV === 'production' && origin && !origin.includes('artfcl.com')) {
       console.warn(`Blocked cross-origin request from: ${origin}`);
       return NextResponse.json({ error: 'Unauthorized origin' }, { status: 403 });
    }

    // Process payload first so honeypot doesn't drain rate-limit buckets
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    // Validate the input using Zod
    const validatedData = contactSchema.parse(body);

    // If honeypot is filled, silently reject BEFORE checking rate limit
    if (validatedData.honeypot) {
      return NextResponse.json({ success: true }, { status: 200 }); // fake success
    }

    // IP-based rate limiting
    // Prefer x-real-ip from Traefik. Fallback to extracting the right-most trusted IP from x-forwarded-for.
    const realIp = request.headers.get('x-real-ip');
    const forwardedFor = request.headers.get('x-forwarded-for');
    let ip = 'unknown';
    
    if (realIp) {
      ip = realIp;
    } else if (forwardedFor) {
      const ips = forwardedFor.split(',').map(s => s.trim());
      ip = ips[ips.length - 1]; // right-most is closest to the proxy
    }

    if (ip === 'unknown' && process.env.NODE_ENV === 'production') {
      console.warn('Unable to determine client IP for rate limiting');
    }

    // Allow max 5 requests per minute per IP. Do not block if IP is entirely unknown to prevent bucket exhaustion.
    if (ip !== 'unknown' && !checkRateLimit(ip, 5, 60000)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const { name, email, phone, company, sector, budget, message } = validatedData;

    // Send the email
    const data = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New Inquiry — ${name} (${sector})`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Company: ${company || 'N/A'}
Sector: ${sector}
Budget: ${budget || 'N/A'}

Message:
${message}
      `,
      // Optional: you can add a nicely formatted HTML version here
    });

    if (data.error) {
      console.error('Resend Error:', data.error.message); // Log message, not the full object
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      // Map issues to generic { path: message } format to avoid leaking Zod internals/payloads
      const details = error.issues.map(issue => ({ path: issue.path.join('.'), message: issue.message }));
      return NextResponse.json({ error: 'Validation failed', details }, { status: 400 });
    }
    
    // Generic error scrubbing
    console.error('Contact API Error occurred during submission processing.');
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
