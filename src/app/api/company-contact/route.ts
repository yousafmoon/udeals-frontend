import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, phone, email, subject, message, receiverEmail } = await req.json();

    if (!receiverEmail) {
      return NextResponse.json(
        { message: "Company email not provided." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: `"${name}" <biz@uaesalondeals.com>`, 
      to: receiverEmail,                     
      replyTo: email,
      subject: subject || "Business Inquiry",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Message has been sent successfully!" });
  } catch (error: any) {
    console.error("Company contact error:", error);
    return NextResponse.json(
      { message: "Failed to send inquiry." },
      { status: 500 }
    );
  }
}
