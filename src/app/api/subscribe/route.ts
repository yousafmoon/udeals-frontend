import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY); 
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Email is required." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Subscribe Website <biz@uaesalondeals.com>",
      to: process.env.SUBSCRIBE_RECEIVER_EMAIL || '',
      subject: "New Subscription",
      html: `<p>New subscriber: <strong>${email}</strong></p>`,
    });

    return NextResponse.json({ message: "Thank you for subscribing!" });
  } catch (error: any) {
    console.error("Resend error:", error);
    return NextResponse.json({ message: "Subscription failed." }, { status: 500 });
  }
}
