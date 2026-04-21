import type { Express, Request, Response } from "express";
import OpenAI from "openai";
import { chatStorage } from "./storage";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const ETYCONS_SYSTEM_PROMPT = `You are the Etycons AI Assistant — a friendly, professional, and conversion-focused chatbot for Etycons, a UK-based e-commerce and digital operations agency. Your role is to help website visitors learn about services, answer questions, and guide them toward booking a free consultation.

ABOUT ETYCONS:
Etycons helps sellers scale their businesses across eBay, TikTok Shop, Amazon, and Shopify in the UK, USA, Europe, and Australia markets. They specialise in end-to-end account management, compliance, product research, and logistics.

SERVICES OFFERED:
1. eBay Account Management — Full eBay store setup, listing optimisation, SEO, pricing strategies, customer service, and returns management.
2. TikTok Shop UK Management — TikTok Shop setup, product listing, content strategy, influencer partnerships, and live selling.
3. Amazon Seller Support — Amazon account setup, product listing, FBA/FBM management, PPC advertising, and brand registry.
4. Shopify Store Setup — Custom Shopify store design, product catalogue setup, payment/shipping configuration, and app integrations.
5. Product Research — Market analysis, competitor research, trending product identification, and demand validation across platforms.
6. Compliance & Account Health — Platform policy compliance, account health monitoring, suspension prevention, and appeal management.
7. UK & USA 3PL Consulting — Third-party logistics setup, warehouse selection, fulfilment strategy, and cost optimisation for UK and USA operations.

MARKETS: UK, USA, Europe, and Australia

BOOKING LINK: https://calendly.com/imaliakbar512/30min (for free 30-minute consultation)

CONTACT: info@etycons.com | Visit the Contact page at /contact

GUIDELINES:
- Be warm, professional, and helpful. Use a conversational but business-appropriate tone.
- Keep responses concise (2-4 sentences when possible). Use bullet points for lists.
- When visitors ask about services, provide a brief overview and encourage booking a free consultation for personalised advice.
- When visitors seem interested or ask pricing questions, guide them to book a consultation: "I'd love to help you further! You can book a free 30-minute consultation here: https://calendly.com/imaliakbar512/30min"
- If asked about pricing, explain that pricing depends on the specific needs and scope, and recommend a consultation to get a tailored quote.
- For technical platform questions (eBay, Amazon, etc.), provide helpful general guidance but recommend Etycons' expert team for account-specific advice.
- Always stay on topic — redirect off-topic questions politely back to e-commerce and Etycons' services.
- Never make up information. If you're unsure, direct the visitor to contact Etycons directly.
- Don't mention you are an AI unless asked. Present yourself as the Etycons assistant.`;

export function registerChatRoutes(app: Express): void {
  app.post("/api/chatbot", async (req: Request, res: Response) => {
    try {
      const { message, conversationId } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      if (message.length > 2000) {
        return res.status(400).json({ error: "Message is too long" });
      }

      let activeConversationId = conversationId ? parseInt(String(conversationId), 10) : null;

      if (activeConversationId && !isNaN(activeConversationId)) {
        const existing = await chatStorage.getConversation(activeConversationId);
        if (!existing) {
          activeConversationId = null;
        }
      } else {
        activeConversationId = null;
      }

      if (!activeConversationId) {
        const conversation = await chatStorage.createConversation("Website Chat");
        activeConversationId = conversation.id;
      }

      await chatStorage.createMessage(activeConversationId, "user", message);

      const history = await chatStorage.getMessagesByConversation(activeConversationId);
      const chatMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: "system", content: ETYCONS_SYSTEM_PROMPT },
        ...history.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ];

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      res.write(`data: ${JSON.stringify({ conversationId: activeConversationId })}\n\n`);

      const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: chatMessages,
        stream: true,
        max_tokens: 512,
      });

      let fullResponse = "";

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          fullResponse += content;
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      await chatStorage.createMessage(activeConversationId, "assistant", fullResponse);

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (error) {
      console.error("Chatbot error:", error);
      if (res.headersSent) {
        res.write(`data: ${JSON.stringify({ error: "Something went wrong. Please try again." })}\n\n`);
        res.end();
      } else {
        res.status(500).json({ error: "Failed to process message" });
      }
    }
  });
}
