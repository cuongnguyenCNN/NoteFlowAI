// pages/api/getData.js
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// Please install OpenAI SDK first: `npm install openai`

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "deepseek-chat",
//   });

//   console.log(completion.choices[0].message.content);
// }

// main();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat", // hoặc gpt-4.1
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
