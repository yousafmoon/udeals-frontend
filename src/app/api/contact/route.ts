import { NextResponse } from 'next/server';
import { Resend } from 'resend';


export async function POST(request: Request) {
const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, concern, message } = await request.json();

    if (!name || !email || !message || !concern) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    await resend.emails.send({
      from: `"${name}" <onboarding@resend.dev>`, 
      to: process.env.CONTACT_RECEIVER_EMAIL || '',  
      replyTo: email,
      subject: `New Contact: ${concern}`,
      html: `
        <div style="font-family:sans-serif;line-height:1.6">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Concern:</strong> ${concern}</p>
          <p><strong>Message:</strong><br>${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ message: 'Message has been sent successfully.' });
  } catch (error: any) {
    console.error("Resend error:", error);
    return NextResponse.json({ message: 'Failed to send message.' }, { status: 500 });
  }
}
