import nodemailer from "nodemailer"

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendDownloadEmail(
  customerEmail: string,
  customerName: string,
  orderItems: { title: string; downloadUrl: string }[],
) {
  const downloadLinks = orderItems.map((item) => `• ${item.title}: ${item.downloadUrl}`).join("\n")

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: customerEmail,
    subject: "Your StudyNotes Purchase - Download Links",
    html: `
      <h2>Thank you for your purchase!</h2>
      <p>Hi ${customerName},</p>
      <p>Your notes are ready for download:</p>
      <div style="background: #f5f5f5; padding: 20px; margin: 20px 0;">
        ${orderItems
          .map(
            (item) => `
          <p><strong>${item.title}</strong><br>
          <a href="${item.downloadUrl}" style="color: #0066cc;">Download Now</a></p>
        `,
          )
          .join("")}
      </div>
      <p>Download links expire in 7 days.</p>
      <p>Happy studying!</p>
    `,
  }

  return await transporter.sendMail(mailOptions)
}

export async function sendContactEmail(name: string, email: string, subject: string, message: string) {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
    subject: `Contact Form: ${subject}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  }

  return await transporter.sendMail(mailOptions)
}
