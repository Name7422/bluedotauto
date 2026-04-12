import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request) {
  const { name, email, tel, subject, message } = await request.json();

  if (!name || !email || !message) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }

  try {
    await sgMail.send({
      from: process.env.SENDGRID_FROM,
      to: process.env.SENDGRID_TO,
      replyTo: email,
      subject: subject || "New contact form message",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${tel || "—"}</p>
        <p><strong>Subject:</strong> ${subject || "—"}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("SendGrid error:", error);
    return Response.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
