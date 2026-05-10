import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/contact-schema';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key');

    // Basic IP-based rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
    
    // Allow max 5 requests per minute per IP
    if (!checkRateLimit(ip, 5, 60000)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();

    // Validate the input using Zod
    const validatedData = contactSchema.parse(body);

    // If honeypot is filled, silently reject (bot prevention)
    if (validatedData.honeypot) {
      return NextResponse.json({ success: true }, { status: 200 }); // fake success
    }

    const { name, email, phone, company, sector, budget, message } = validatedData;

    // Send the email
    const data = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || 'contact@artfcl.com', // Must be verified in Resend
      to: process.env.CONTACT_TO_EMAIL || 'info@artfcl.com',
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
      console.error('Resend Error:', data.error);
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
