// /pages/api/generate-note.js
import { GoogleGenAI } from "@google/genai";
const genAI = new GoogleGenAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { youtubeUrl } = req.body;

  try {
    // B1: Lấy transcript (demo dùng API miễn phí bên thứ 3)
    // const videoId = new URL(youtubeUrl).searchParams.get("v");
    // const transcriptRes = await axios.get(
    //   `https://youtube-transcript-api.vercel.app/api/transcript/${videoId}`
    // );
    // const transcript = transcriptRes.data?.transcript?.join(" ") || "";

    // if (!transcript)
    //   return res.status(400).json({ error: "Transcript not found" });

    // B2: Gọi Gemini để tạo ghi chú
    // const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Tạo ghi chú chi tiết (note) từ video YouTube sau:\n\n${youtubeUrl}`;
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    // const result = await model.generateContent(prompt);
    const text = response.text();

    res.status(200).json({ notes: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Có lỗi khi xử lý ghi chú từ YouTube." });
  }
}
