import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, phone, email, subject, message, receiverEmail } = await req.json();

    if (!receiverEmail) {
      return NextResponse.json(
        { message: "Company email not provided." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`, 
      replyTo: email, 
      to: receiverEmail,
      subject: subject || "Business Inquiry",
      text: `
        Name: ${name}
        Phone: ${phone}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
            `,
            });

    return NextResponse.json({ message: "Inquiry sent to the company!" });
  } catch (error) {
    console.error("Company contact error:", error);
    return NextResponse.json(
      { message: "Failed to send inquiry." },
      { status: 500 }
    );
  }
}
