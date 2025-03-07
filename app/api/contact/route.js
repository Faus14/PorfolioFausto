import sgMail from '@sendgrid/mail';

export async function POST(req) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  const { name, email, message } = await req.json();
  
  const msg = {
    to: process.env.EMAIL_ADDRESS,
    from: process.env.SENDER_EMAIL, // Email verificado en SendGrid
    subject: `Nuevo mensaje de ${name}`,
    text: `Mensaje de ${name} (${email}): ${message}`,
    html: `<p>Nombre: ${name}</p><p>Email: ${email}</p><p>Mensaje: ${message}</p>`,
    replyTo: email
  };
  
  try {
    await sgMail.send(msg);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}