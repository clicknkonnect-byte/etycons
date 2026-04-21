import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import nodemailer from "nodemailer";
import { registerChatRoutes } from "./replit_integrations/chat/routes";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "etycons2024";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendEnquiryEmail(data: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message: string;
}) {
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1a1a2e; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0;">New Customer Enquiry</h2>
        <p style="margin: 5px 0 0; opacity: 0.8;">Submitted via Etycons Website</p>
      </div>
      <div style="border: 1px solid #e0e0e0; border-top: none; padding: 20px; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Name:</td>
            <td style="padding: 8px 0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          ${data.phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0;">${data.phone}</td></tr>` : ""}
          ${data.company ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td><td style="padding: 8px 0;">${data.company}</td></tr>` : ""}
          ${data.service ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Service:</td><td style="padding: 8px 0;">${data.service}</td></tr>` : ""}
        </table>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 15px 0;" />
        <p style="font-weight: bold; color: #555; margin-bottom: 5px;">Message:</p>
        <p style="background: #f9f9f9; padding: 12px; border-radius: 6px; line-height: 1.6;">${data.message}</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Etycons Website" <${process.env.SMTP_USER}>`,
    to: "info@etycons.com",
    subject: `New Enquiry from ${data.name}${data.service ? ` - ${data.service}` : ""}`,
    html: htmlBody,
    replyTo: data.email,
  });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      (req.session as any).isAdmin = true;
      res.json({ success: true });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  });

  app.get("/api/contact", (req, res, next) => {
    if (!(req.session as any)?.isAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  }, async (_req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Fetch submissions error:", error);
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });

  registerChatRoutes(app);

  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      const submission = await storage.createContactSubmission(data);

      try {
        await sendEnquiryEmail(data);
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
      }

      res.status(201).json(submission);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Contact submission error:", error);
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });

  return httpServer;
}
