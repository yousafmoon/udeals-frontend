import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, concern, message } = await request.json();

    if (!name || !email || !message || !concern) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.yourhost.com',
      port: 587,
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`, 
      to: process.env.RECEIVER_EMAIL,                
      replyTo: email,                                 
      subject: `New Contact: ${concern}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Concern:</strong> ${concern}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    return NextResponse.json({ message: 'Message sent successfully.' });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json({ message: 'Failed to send message.' }, { status: 500 });
  }
}
