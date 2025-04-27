import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, name, picture, googleToken } = req.body;

  if (!email || !name || !picture || !googleToken) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Kiểm tra user đã tồn tại chưa
  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error(fetchError);
    return res.status(500).json({ error: fetchError.message });
  }

  if (existingUser) {
    // Nếu user đã tồn tại, có thể cập nhật googleToken nếu muốn
    const { data: updatedUser, error: updateError } = await supabase
      .from("users")
      .update({ user_token_google: googleToken })
      .eq("id", existingUser.id)
      .select("*")
      .single();

    if (updateError) {
      console.error(updateError);
      return res.status(500).json({ error: updateError.message });
    }

    return res.status(200).json({ user: updatedUser });
  }

  // Nếu chưa tồn tại, tạo mới
  const { data: newUser, error: insertError } = await supabase
    .from("users")
    .insert([{ email, name, picture, user_token_google: googleToken }])
    .select("*")
    .single();

  if (insertError) {
    console.error(insertError);
    return res.status(500).json({ error: insertError.message });
  }

  return res.status(200).json({ user: newUser });
}
