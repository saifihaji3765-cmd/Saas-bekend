import { supabase } from "../utils/supabase.js";

export default async function handler(req, res) {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) return res.status(400).json({ error: error.message });

  await supabase.from("users").insert({
    id: data.user.id,
    plan: "free",
    requests_used: 0
  });

  res.json({ success: true });
}
