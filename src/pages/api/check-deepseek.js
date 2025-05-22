import { OpenAI } from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "", // Replace with your actual API key
});

export default async function handler(req, res) {
  try {
    const testResponse = await client.chat.completions.create({
      extraHeaders: {
        "HTTP-Referer": "YOUR_SITE_URL", // Optional, replace with your site URL
        "X-Title": "YOUR_SITE_NAME", // Optional, replace with your site name
      },
      model: "deepseek/deepseek-r1:free",
      messages: [{ role: "user", content: "Ping test: Just say 'Hello'." }],
    });

    if (testResponse.choices && testResponse.choices.length > 0) {
      return res.status(200).json({ status: "✅ DeepSeek API is working." });
    } else {
      throw new Error("No valid response from DeepSeek.");
    }
  } catch (error) {
    console.error("❌ DeepSeek API Error:", error.message);
    return res.status(500).json({ status: "❌ DeepSeek API is not responding." });
  }
}