// /pages/api/folders/list.ts
import { Note, Folder } from "@/src/types";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
interface RequestQuery {
  userId: string; // or number, depending on your use case
}

interface ResponseData {
  error?: string;
  notes?: Note[]; // You can replace `any[]` with a more specific type if needed
}

export default async function handler(
  req: { method: string; query: RequestQuery },
  res: {
    status: (statusCode: number) => {
      end: () => void;
      json: (data: ResponseData) => void;
    };
    setHeader: (key: string, value: string) => void;
  }
) {
  if (req.method !== "GET") return res.status(405).end();

  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }
  console.log(userId);
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", String(userId));

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ notes: data });
}
