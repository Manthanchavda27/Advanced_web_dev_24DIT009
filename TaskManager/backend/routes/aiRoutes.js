const express = require("express");
const router = express.Router();

router.post("/generate-description", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    // Dynamically require so missing key doesn't crash server on startup
    const OpenAI = require("openai");
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Write a short, clear task description (1-2 sentences) for a task titled: "${title}". Be concise and actionable.`,
        },
      ],
      max_tokens: 80,
    });

    res.json({ description: completion.choices[0].message.content.trim() });
  } catch (err) {
    // Graceful degradation — app keeps working even if AI fails
    console.error("[AI] Error:", err.message);
    res.json({ description: "", fallback: true, message: "AI unavailable. Please write a description manually." });
  }
});

module.exports = router;
