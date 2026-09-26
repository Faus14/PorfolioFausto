import { Resend } from "resend";
import { NextResponse } from "next/server";
import { isValidEmail } from "@/utils/check-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMITS = { name: 100, email: 100, message: 1000 };

// User input goes into an HTML email: escape it.
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON." }, { status: 400 });
  }

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ success: false, message: "Missing required fields." }, { status: 400 });
  }
  if (
    !isValidEmail(email) ||
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    message.length > LIMITS.message
  ) {
    return NextResponse.json({ success: false, message: "Invalid input." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_ADDRESS) {
    console.error("Contact form: RESEND_API_KEY or EMAIL_ADDRESS is not configured.");
    return NextResponse.json({ success: false, message: "Email service not configured." }, { status: 500 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    // Default Resend sender avoids unverified-domain issues; replyTo routes answers to the visitor.
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.EMAIL_ADDRESS,
      subject: `Nuevo mensaje de Portfolio: ${name.replace(/[\r\n]/g, " ")}`,
      replyTo: email,
      text: `De: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0d1224;">Nuevo mensaje recibido</h2>
          <p><strong>De:</strong> ${safeName} (<a href="mailto:${safeEmail}">${safeEmail}</a>)</p>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="white-space: pre-wrap; color: #374151; background: #f9fafb; padding: 15px; border-radius: 8px;">${safeMessage}</p>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 12px; color: #6b7280;">Enviado desde el formulario de contacto de faustosaludas.com.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ success: false, message: "Could not send email." }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: "Email sent successfully!" }, { status: 200 });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
  }
}
