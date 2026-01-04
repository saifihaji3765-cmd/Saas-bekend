import { supabase } from "../utils/supabase.js";

export default async function handler(req, res) {
  const { user_id } = req.body;

  await supabase
    .from("users")
    .update({ plan: "pro", requests_used: 0 })
    .eq("id", user_id);

  res.json({ success: true, plan: "pro" });
}
