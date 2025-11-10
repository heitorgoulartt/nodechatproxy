import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.get("/send-message", async (req, res) => {
  const { phone, message = "Olá! Teste de proxy via Replit + n8n." } = req.query;

  if (!phone) {
    return res.status(400).json({ error: "Missing 'phone' parameter" });
  }

  try {
    const response = await fetch(
      `https://api.2chat.co/v1/instances/${process.env.INSTANCE_ID}/client/action/send-message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": process.env.API_KEY,
        },
        body: JSON.stringify({
          chatId: `${phone}@c.us`,
          message,
        }),
      }
    );

    const data = await response.json();
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Proxy running on port ${port}`);
});
