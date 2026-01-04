import OpenAI from "openai";
import { supabase } from "../utils/supabase.js";
import { saasGuard } from "../utils/saasGuard.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    const { user_id, business } = req.body;

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("id", user_id)
      .single();

    saasGuard(user);

    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a business risk & future prediction AI"
        },
        {
          role: "user",
          content: business
        }
      ]
    });

    await supabase
      .from("users")
      .update({ requests_used: user.requests_used + 1 })
      .eq("id", user_id);

    res.json({
      result: ai.choices[0].message.content,
      remaining:
        user.plan === "free"
          ? 3 - (user.requests_used + 1)
          : "Unlimited"
    });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}
