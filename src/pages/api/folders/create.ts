// /pages/api/folders/list.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
interface RequestBody {
  userId: string; // or number, depending on your use case
  name: string;
}

interface ResponseData {
  error?: string;
  folders?: string[]; // You can further specify this type if you know the structure of the folders
}

export default async function handler(
  req: { method: string; body: RequestBody },
  res: {
    status: (statusCode: number) => {
      end: () => void;
      json: (data: ResponseData) => void;
    };
  }
) {
  if (req.method !== "POST") return res.status(405).end();

  const { userId, name } = req.body;
  if (!userId || !name) {
    return res.status(400).json({ error: "Missing userId or folder name" });
  }

  // 1. Kiểm tra folder đã tồn tại chưa
  const { data: existingFolders, error: fetchError } = await supabase
    .from("folders")
    .select("*")
    .eq("user_id", userId)
    .eq("name", name)
    .single(); // vì mỗi user chỉ nên có 1 folder với 1 tên

  if (fetchError && fetchError.code !== "PGRST116") {
    // PGRST116: no rows returned
    console.error(fetchError);
    return res.status(500).json({ error: fetchError.message });
  }

  if (existingFolders) {
    return res
      .status(409)
      .json({ error: "Folder with this name already exists." });
  }
  const { data, error } = await supabase
    .from("folders")
    .insert([{ user_id: userId, name }])
    .select("*");
  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ folders: data });
}
