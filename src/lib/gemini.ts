import { GoogleGenAI } from "@google/genai";

// Chỉ dùng biến môi trường bắt đầu bằng NEXT_PUBLIC_ để client-side có thể truy cập
const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;

export const gemini = new GoogleGenAI({
  apiKey: geminiApiKey,
});
