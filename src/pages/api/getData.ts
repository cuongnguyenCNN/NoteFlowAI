// pages/api/getData.js
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // hoặc gpt-4.1
      messages: [
        {
          role: "user",
          content: "Write",
        },
      ],
    });

    res.status(200).json({ text: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate text." });
  }
}
