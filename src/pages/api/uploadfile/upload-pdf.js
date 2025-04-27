// pages/api/upload-pdf.js
import axios from "axios";
import FormData from "form-data";

export const config = {
  api: {
    bodyParser: false, // Bắt buộc vì mình tự xử lý form-data
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const fileBuffer = Buffer.concat(buffers);

    const formData = new FormData();
    formData.append("file", fileBuffer, "upload.pdf");
    formData.append("purpose", "assistants");

    // 1. Upload file
    const uploadRes = await axios.post(
      "https://api.openai.com/v1/files",
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          ...formData.getHeaders(),
        },
      }
    );

    const fileId = uploadRes.data.id;

    // 2. Create Thread
    const threadRes = await axios.post(
      "https://api.openai.com/v1/threads",
      {},
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      }
    );
    const threadId = threadRes.data.id;

    // 3. Send Message
    await axios.post(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      {
        role: "user",
        content: `Tóm tắt file PDF thành bài viết dạng HTML với các tiêu đề lớn nhỏ, nội dung rõ ràng, phong cách chuyên nghiệp. Không thêm CSS hoặc class.`,
        file_ids: [fileId],
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      }
    );

    // 4. Run Assistant
    const runRes = await axios.post(
      `https://api.openai.com/v1/threads/${threadId}/runs`,
      {
        assistant_id: process.env.OPENAI_ASSISTANT_ID, // Assistant của mày
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      }
    );

    const runId = runRes.data.id;

    // 5. Poll status
    let status = "in_progress";
    let retries = 30; // 30 lần, mỗi lần 2s => tối đa 1 phút

    while (status === "in_progress" || status === "queued") {
      if (retries <= 0) {
        throw new Error("Timeout waiting for assistant to complete.");
      }

      await new Promise((resolve) => setTimeout(resolve, 2000)); // Đợi 2s

      const runStatusRes = await axios.get(
        `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`,
        {
          headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        }
      );

      status = runStatusRes.data.status;
      retries--;
    }

    if (status !== "completed") {
      throw new Error(`Run failed with status: ${status}`);
    }

    // 6. Get Message
    const messagesRes = await axios.get(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      }
    );

    const assistantReply = messagesRes.data.data[0].content[0].text.value;

    return res.status(200).json({ html: assistantReply });
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
}
