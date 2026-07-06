import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Nodemailer Transporter
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    
    if (!user || !pass) {
      console.warn("SMTP_USER or SMTP_PASS environment variables are not set. Emails will not be sent, but submissions will still be saved locally.");
      return null;
    }

    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "465", 10);
    const secure = process.env.SMTP_SECURE !== "false" && (port === 465 || process.env.SMTP_SECURE === "true");

    transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });
  }
  return transporter;
}

// API endpoint for contact messages
app.post("/api/contact", async (req, res) => {
  const { name, email, purpose, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required fields." });
  }

  const destinationEmail = process.env.DESTINATION_EMAIL || "saks4027@gmail.com";
  const mailTransporter = getTransporter();

  if (!mailTransporter) {
    return res.json({ 
      success: true, 
      emailSent: false, 
      info: "Message saved locally, but SMTP credentials are not configured in environment variables to forward this to your Gmail." 
    });
  }

  const mailOptions = {
    from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
    to: destinationEmail,
    replyTo: email,
    subject: `New Portfolio Message from ${name} (${purpose})`,
    text: `
You have received a new contact submission from your portfolio website.

Sender Details:
------------------------------------------
Name: ${name}
Email: ${email}
Purpose of Connection: ${purpose}

Message Content:
------------------------------------------
${message}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #3c4ef2; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px;">New Contact Message</h2>
          <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Portfolio Collaboration Portal</p>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 120px; color: #4a5568;">Sender:</td>
              <td style="padding: 6px 0; color: #1a202c;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #4a5568;">Email:</td>
              <td style="padding: 6px 0; color: #1a202c;"><a href="mailto:${email}" style="color: #3c4ef2; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #4a5568;">Purpose:</td>
              <td style="padding: 6px 0; color: #1a202c;"><span style="background-color: #ebf8ff; color: #2b6cb0; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">${purpose}</span></td>
            </tr>
          </table>
          <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 20px 0;">
          <h3 style="font-size: 14px; color: #4a5568; margin-bottom: 10px;">Message Content:</h3>
          <div style="background-color: #f7fafc; padding: 15px; border-left: 4px solid #ff5522; border-radius: 4px; font-style: italic; white-space: pre-wrap; color: #2d3748;">
            "${message}"
          </div>
        </div>
        <div style="background-color: #edf2f7; padding: 12px; text-align: center; font-size: 11px; color: #718096;">
          This email was sent automatically from your AI Studio Portfolio App.
        </div>
      </div>
    `
  };

  try {
    await mailTransporter.sendMail(mailOptions);
    return res.json({ success: true, emailSent: true });
  } catch (error: any) {
    console.error("Error sending email via Nodemailer:", error);
    return res.json({ 
      success: true, 
      emailSent: false, 
      error: error.message || "An unknown error occurred while sending the email." 
    });
  }
});

// Vite middleware for development or static server for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
