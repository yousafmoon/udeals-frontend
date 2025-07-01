import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Email is required." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", 
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Website Subscription" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER, 
      subject: "New Subscription",
      text: `A new user subscribed with email: ${email}`,
    });

    return NextResponse.json({ message: "Thank you for subscribing!" });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ message: "Subscription failed." }, { status: 500 });
  }
}
