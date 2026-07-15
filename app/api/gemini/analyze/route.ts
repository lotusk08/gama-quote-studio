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
        { error: "Vui lòng thiết lập API Key của Gemini trong file .env.local để sử dụng tính năng phân tích hình ảnh AI." },
        { status: 500 }
      );
    }

    const { imageBase64, mimeType } = await req.json();
    if (!imageBase64) {
      return NextResponse.json({ error: "Không tìm thấy dữ liệu hình ảnh" }, { status: 400 });
    }

    const prompt = `Hãy phân tích hình ảnh sản phẩm thiết bị vệ sinh, sơn nước, hoặc gạch men này và trích xuất/đề xuất thông tin sản phẩm chi tiết bằng tiếng Việt dưới dạng JSON:
- Đề xuất một mã sản phẩm ngắn gọn (ví dụ: LDVX11LZ, GM-01, AR-99) dựa trên loại thiết bị trong ảnh.
- Tên sản phẩm rõ ràng, chi tiết và chuyên nghiệp (ví dụ: "Bộ tay xịt ti đồng, dây nhựa lưới 3 lớp", "Sen cây nóng lạnh cao cấp").
- Lựa chọn một trong 3 thương hiệu phù hợp nhất hoặc mặc định: "GAMA", "Lendo", "Ares" (Nếu là vòi xịt hay sen vòi hãy ưu tiên Lendo, nếu là gạch gốm hay sơn hãy ưu tiên GAMA, nếu là sản phẩm hiện đại/màu tối hãy chọn Ares).
- Giá bán ước lượng bằng VNĐ, ví dụ: 55000, 64000, 120000...
- Đơn vị tính phù hợp (thường là "Bộ" hoặc "Cái").
- Đề xuất một mô tả ngắn hoặc chất liệu chính phát hiện được.`;

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
                productCode: { type: Type.STRING, description: "Mã sản phẩm đề xuất, viết hoa liền nhau" },
                productName: { type: Type.STRING, description: "Tên hàng hóa chi tiết, viết hoa chữ cái đầu, ví dụ: Bộ tay xịt vệ sinh dây inox cao cấp" },
                brand: { type: Type.STRING, description: "Thương hiệu, phải chọn đúng 1 trong 3: GAMA, Lendo, Ares" },
                price: { type: Type.NUMBER, description: "Giá bán đề xuất bằng số nguyên VNĐ" },
                unit: { type: Type.STRING, description: "Đơn vị tính, thường là Bộ hoặc Cái" },
                description: { type: Type.STRING, description: "Mô tả chất liệu, thiết kế nổi bật phát hiện được" },
              },
              required: ["productCode", "productName", "brand", "price", "unit"],
            },
          },
        });
        if (response) break;
      } catch (err: any) {
        console.warn(`Model ${modelName} in analysis API failed, trying next. Error:`, err.message || err);
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
    console.error("Gemini API Error:", err);
    return NextResponse.json({ error: err.message || "Lỗi xử lý API phía máy chủ" }, { status: 500 });
  }
}
