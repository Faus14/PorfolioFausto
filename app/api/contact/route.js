import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Garantiza runtime Node (no Edge) para usar sockets SMTP
export const runtime = "nodejs";
// Evita cachear la ruta en producción
export const dynamic = "force-dynamic";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,          // STARTTLS
  secure: false,      // true si usás 465
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSKEY, // App Password de Gmail (16 chars)
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// Plantilla HTML
const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <h2 style="color: #007BFF;">Nuevo mensaje recibido</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${userMessage}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Haz clic en responder para responder al remitente.</p>
    </div>
  </div>
`;

function sanitize(str, max = 1000) {
  if (typeof str !== "string") return "";
  return str.replace(/<[^>]*>?/gm, "").slice(0, max);
}

async function sendEmail({ name, email, message }) {
  const safeName = sanitize(name, 120);
  const safeEmail = sanitize(email, 200);
  const safeMessage = sanitize(message, 5000);

  const mailOptions = {
    from: `Portfolio <${process.env.EMAIL_ADDRESS}>`,
    to: process.env.EMAIL_ADDRESS,
    subject: `Nuevo mensaje de ${safeName}`,
    text: `Nuevo mensaje de ${safeName}\n\nEmail: ${safeEmail}\n\nMensaje:\n\n${safeMessage}`,
    html: generateEmailTemplate(safeName, safeEmail, safeMessage),
    replyTo: safeEmail,
  };

  await transporter.sendMail(mailOptions);
}

export async function POST(req) {
  try {
    if (!process.env.EMAIL_ADDRESS || !process.env.GMAIL_PASSKEY) {
      return NextResponse.json(
        { success: false, message: "Credenciales de correo no configuradas." },
        { status: 400 }
      );
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, message: "Content-Type inválido." },
        { status: 415 }
      );
    }

    const payload = await req.json();
    const { name, email, message } = payload || {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Faltan campos requeridos." },
        { status: 400 }
      );
    }

    // Validación básica de email (server-side)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email))) {
      return NextResponse.json(
        { success: false, message: "Email inválido." },
        { status: 400 }
      );
    }

    await sendEmail({ name, email, message });

    return NextResponse.json(
      { success: true, message: "¡Mensaje enviado exitosamente!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { success: false, message: "Ocurrió un error en el servidor." },
      { status: 500 }
    );
  }
}

// Opcional: bloquear otros métodos
export async function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
