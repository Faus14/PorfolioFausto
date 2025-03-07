import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSKEY, 
  },
});

// Plantilla del correo HTML
const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
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

// Función de ayuda para enviar un correo usando Nodemailer
async function sendEmail(payload) {
  const { name, email, message: userMessage } = payload;
  
  const mailOptions = {
    from: 'Portfolio',
    to: process.env.EMAIL_ADDRESS,
    subject: `Nuevo mensaje de ${name}`,
    text: `Nuevo mensaje de ${name}\n\nEmail: ${email}\n\nMensaje:\n\n${userMessage}`,
    html: generateEmailTemplate(name, email, userMessage),
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error al enviar el correo:', error.message);
    return false;
  }
}

// Manejador de la solicitud POST
export async function POST(req) {
  try {
    const payload = await req.json();
    const { name, email, message: userMessage } = payload;

    // Validar que las credenciales del correo estén presentes
    if (!process.env.EMAIL_ADDRESS || !process.env.GMAIL_PASSKEY) {
      return new Response(
        JSON.stringify({ success: false, message: 'Las credenciales del correo no están configuradas correctamente.' }),
        { status: 400 }
      );
    }

    const message = `Nuevo mensaje de ${name}\n\nEmail: ${email}\n\nMensaje:\n\n${userMessage}\n\n`;

    // Enviar el correo
    const emailSuccess = await sendEmail(payload);

    if (emailSuccess) {
      return new Response(
        JSON.stringify({ success: true, message: '¡Mensaje y correo enviados exitosamente!' }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ success: false, message: 'Falló el envío del mensaje o correo.' }),
      { status: 500 }
    );
  } catch (error) {
    console.error('Error en la API:', error.message);
    return new Response(
      JSON.stringify({ success: false, message: 'Ocurrió un error en el servidor.' }),
      { status: 500 }
    );
  }
}
