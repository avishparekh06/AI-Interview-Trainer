import { OpenAI } from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "", // Replace with your actual API key
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { transcripts } = req.body;
  console.log("📩 Received transcripts in API:", transcripts);

  if (!transcripts || transcripts.length === 0) {
    return res.status(400).json({ error: "❌ No transcripts provided" });
  }

  // Construct the prompt for DeepSeek AI
  const prompt = `
    You are an expert sales interviewer analyzing a candidate's responses to a structured mock sales interview.
    Each response must be graded using **four key metrics**:
    
    1. **Clarity (1-5):** Is the response structured, logical, and easy to follow?  
    2. **Relevance (1-5):** Does the answer directly address the question, demonstrating strong sales knowledge?  
    3. **Persuasiveness (1-5):** Does the response demonstrate confidence, storytelling, and effective selling techniques?  
    4. **Overall Sales Readiness (1-5):** Based on the response, does the candidate appear ready for a real sales role?

    ---  
    **Candidate Responses for Evaluation:**

    **Q1: Tell me about a time you closed a big enterprise deal.**  
    - Candidate’s Response: "${transcripts[0]?.response || "No response provided"}"  

    **Q2: How would you pitch an AI tool to a skeptical law firm partner?**  
    - Candidate’s Response: "${transcripts[1]?.response || "No response provided"}"  

    **Q3: What’s your top prospecting tactic?**  
    - Candidate’s Response: "${transcripts[2]?.response || "No response provided"}"  

    ---  
    **How You Should Analyze Responses:**
    - For each response, provide a **score (1-5) per metric** and a **short explanation**.  
    - At the end, summarize the **candidate’s strengths & weaknesses** based on their overall sales ability.  
    - **Format your response clearly, like this example:**

    ---
    **Q1: Tell me about a time you closed a big enterprise deal.**  
    - **Clarity:** 4/5 - Well-structured story, but some minor details were unclear.  
    - **Relevance:** 5/5 - Directly addressed enterprise deal closure.  
    - **Persuasiveness:** 3/5 - Could have used more compelling storytelling techniques.  
    - **Overall Sales Readiness:** 4/5 - Strong understanding, but needs refinement in closing tactics.  

    ---
    **Final Summary:**  
    "The candidate demonstrates strong knowledge in AI pitching but needs to refine their enterprise deal closing strategy and improve their prospecting techniques for real-world application."
  `;

  try {
    console.log("📡 Sending prompt to DeepSeek via OpenRouter...");

    const completion = await client.chat.completions.create({
      extraHeaders: {
        "HTTP-Referer": "YOUR_SITE_URL", // Optional, replace with your site URL
        "X-Title": "YOUR_SITE_NAME", // Optional, replace with your site name
      },
      model: "deepseek/deepseek-r1:free",
      messages: [{ role: "user", content: prompt }],
    });

    const analysis = completion.choices[0].message.content || "No analysis generated.";
    
    res.status(200).json({ analysis });
  } catch (error) {
    console.error("❌ DeepSeek API Error:", error.message);

    // ✅ Fallback response to prevent crashes
    res.status(200).json({ analysis: "⚠️ OpenRouter API quota exceeded. Please try again later." });
  }
};