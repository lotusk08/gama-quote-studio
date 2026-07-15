import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Vui lòng thiết lập API Key của Gemini trong file .env.local để sử dụng tính năng tách nền AI." },
        { status: 500 }
      );
    }

    const { imageBase64, mimeType } = await req.json();
    if (!imageBase64) {
      return NextResponse.json({ error: "Không tìm thấy dữ liệu hình ảnh" }, { status: 400 });
    }

    const prompt = `You are a professional image segmentation assistant.
Your task is to outline the main product in the image (e.g. the faucet, toilet, trophy, tiles, paint bucket, etc.) with a highly detailed, smooth polygon.
Exclude the background (desks, tables, chairs, office floor, walls, shadows on surfaces, people).
Return a JSON object containing:
- "points": A list of x and y coordinate objects representing a tight closed polygon enclosing ONLY the main product.
- Each coordinate must be a normalized integer between 0 and 1000 (representing coordinates in a 1000x1000 grid).
- Provide 80 to 120 points to outline the shape as smoothly and accurately as possible.`;

    const imagePart = {
      inlineData: {
        mimeType: mimeType || "image/jpeg",
        data: imageBase64,
      },
    };

    const modelsToTry = [
      "gemini-2.0-flash-lite",
      "gemini-1.5-flash-latest",
      "gemini-2.0-flash",
      "gemini-3.5-flash",
      "gemini-2.0-flash-exp",
      "gemini-1.5-pro-latest",
      "gemini-1.5-flash-002"
    ];

    let response;
    let lastError;

    for (const modelName of modelsToTry) {
      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents: [imagePart, { text: prompt }],
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                points: {
                  type: Type.ARRAY,
                  description: "Array of polygon coordinates mapping the outline of the main product",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      x: { type: Type.INTEGER, description: "X coordinate (0-1000)" },
                      y: { type: Type.INTEGER, description: "Y coordinate (0-1000)" },
                    },
                    required: ["x", "y"]
                  }
                }
              },
              required: ["points"],
            },
          },
        });
        if (response) break;
      } catch (err: any) {
        console.warn(`Model ${modelName} in remove-bg API failed, trying next. Error:`, err.message || err);
        lastError = err;
      }
    }

    if (!response) {
      return NextResponse.json(
        { error: `Tất cả mô hình Gemini đều bận. Chi tiết lỗi: ${lastError?.message || "Service Unavailable"}` },
        { status: 503 }
      );
    }

    const resultText = response.text;
    if (!resultText) {
      return NextResponse.json({ error: "Không nhận được phản hồi từ Gemini" }, { status: 500 });
    }

    const data = JSON.parse(resultText);
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Gemini Remove BG API Error:", err);
    return NextResponse.json({ error: err.message || "Lỗi xử lý API phía máy chủ" }, { status: 500 });
  }
}
