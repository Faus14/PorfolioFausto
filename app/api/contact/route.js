import { Resend } from "resend";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Usamos el sender por defecto de Resend para evitar problemas de dominio no verificado.
    // El 'reply_to' asegura que cuando Fausto responda, vaya al email del usuario.
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.EMAIL_ADDRESS,
      subject: `Nuevo mensaje de Portfolio: ${name}`,
      reply_to: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">Nuevo Mensaje Recibido</h2>
          <p><strong>De:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="white-space: pre-wrap; color: #374151; background: #f9fafb; padding: 15px; border-radius: 8px;">${message}</p>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 12px; color: #6b7280;">Este mensaje fue enviado desde el formulario de contacto de tu portfolio.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
