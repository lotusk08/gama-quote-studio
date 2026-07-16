"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  Trash2,
  Plus,
  ArrowUp,
  ArrowDown,
  Upload,
  Download,
  Sparkles,
  Settings,
  User,
  Phone,
  FileText,
  Check,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize,
  Image as ImageIcon,
  Edit2,
  RefreshCw,
  FileDown,
  Printer,
  ChevronRight,
  Info,
  Layers,
  Palette,
  Sliders,
  Sparkle
} from "lucide-react";

// ==========================================
// SVGs & Fallback Vector Assets for CORS-free High-Res Rendering
// ==========================================

// Premium vector-based faucet SVG placeholders (Base64/Inline SVGs)
const FIXTURE_SVGS = {
  spray_blue: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%"><rect width="400" height="400" fill="%23e0f2fe"/><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%25" stop-color="%230284c7" stop-opacity="0.1"/><stop offset="100%25" stop-color="%230284c7" stop-opacity="0.3"/></linearGradient></defs><rect width="400" height="400" fill="url(%23g1)"/><g transform="translate(100, 80)" stroke="%230284c7" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M40,240 L40,140 Q40,40 100,40 L120,40 Q150,40 150,70 L150,110 Q150,130 130,130 L100,130 Q80,130 80,110" stroke-width="12" fill="%23ffffff"/><path d="M100,20 Q100,10 110,10 L130,10 Q140,10 140,20 Q140,30 130,30 L110,30 Z" fill="%230284c7" stroke-width="4"/><path d="M30,240 L50,240 M40,240 Q40,280 80,300 T160,320" stroke="%2394a3b8" stroke-width="6" stroke-dasharray="2,6"/><circle cx="150" cy="110" r="10" fill="%23e11d48" stroke="none"/><circle cx="100" cy="40" r="4" fill="%230284c7"/><path d="M40,140 L30,150 M40,160 L30,170" stroke-width="4"/></g></svg>`,

  spray_gray: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%"><rect width="400" height="400" fill="%23f1f5f9"/><defs><linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%25" stop-color="%23475569" stop-opacity="0.1"/><stop offset="100%25" stop-color="%23475569" stop-opacity="0.3"/></linearGradient></defs><rect width="400" height="400" fill="url(%23g2)"/><g transform="translate(100, 80)" stroke="%23475569" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M40,240 L40,140 Q40,40 100,40 L120,40 Q150,40 150,70 L150,110 Q150,130 130,130 L100,130 Q80,130 80,110" stroke-width="12" fill="%23f8fafc"/><path d="M100,20 Q100,10 110,10 L130,10 Q140,10 140,20 Q140,30 130,30 L110,30 Z" fill="%23475569" stroke-width="4"/><path d="M30,240 L50,240 M40,240 Q40,280 80,300 T160,320" stroke="%2394a3b8" stroke-width="6" stroke-dasharray="2,6"/><circle cx="150" cy="110" r="10" fill="%23475569" stroke="none"/><circle cx="100" cy="40" r="4" fill="%23475569"/><path d="M40,140 L30,150 M40,160 L30,170" stroke-width="4"/></g></svg>`,

  faucet_green: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%"><rect width="400" height="400" fill="%23f0fdf4"/><defs><linearGradient id="g3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%25" stop-color="%230d5235" stop-opacity="0.1"/><stop offset="100%25" stop-color="%230d5235" stop-opacity="0.3"/></linearGradient></defs><rect width="400" height="400" fill="url(%23g3)"/><g transform="translate(100, 100)" stroke="%230d5235" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M30,220 L70,220 L70,100 Q70,40 140,40 L180,40" stroke-width="12" fill="none"/><path d="M180,30 L190,40 L180,50 Z" fill="%23a88c52" stroke="%23a88c52" stroke-width="4"/><circle cx="70" cy="130" r="14" fill="%23a88c52" stroke="none"/><path d="M70,130 L110,130" stroke="%23ffffff" stroke-width="4"/><path d="M180,40 Q180,80 180,120" stroke="%23a88c52" stroke-width="4" stroke-dasharray="2,4"/><circle cx="140" cy="40" r="4" fill="%230d5235"/></g></svg>`,

  faucet_gold: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%"><rect width="400" height="400" fill="%23fffbeb"/><defs><linearGradient id="g4" x1="0" y1="0" x2="1" y2="1"><stop offset="0%25" stop-color="%23a88c52" stop-opacity="0.1"/><stop offset="100%25" stop-color="%23a88c52" stop-opacity="0.3"/></linearGradient></defs><rect width="400" height="400" fill="url(%23g4)"/><g transform="translate(100, 100)" stroke="%23a88c52" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M30,220 L70,220 L70,100 Q70,40 140,40 L180,40" stroke-width="12" fill="none"/><path d="M180,30 L190,40 L180,50 Z" fill="%230d5235" stroke="%230d5235" stroke-width="4"/><circle cx="70" cy="130" r="14" fill="%230d5235" stroke="none"/><path d="M70,130 L110,130" stroke="%23ffffff" stroke-width="4"/><path d="M180,40 Q180,80 180,120" stroke="%230d5235" stroke-width="4" stroke-dasharray="2,4"/><circle cx="140" cy="40" r="4" fill="%23a88c52"/></g></svg>`
};

// Interface definitions
interface Product {
  id: string;
  productCode: string;
  productName: string;
  brand: "GAMA" | "Lendo" | "Ares";
  price: number;
  unit: string;
  image: string;
  isCustomImage?: boolean;
  originalImage?: string;
  isBgRemoved?: boolean;
  // Image Enhancements
  brightness: number;
  contrast: number;
  saturate: number;
  rotation: number;
  bgColor: string;
  padding: number;
  scale?: number;
  description?: string;
}

interface GeneralInfo {
  title: string;
  subtitle: string;
  recipient: string;
  date: string;
  companyName: string;
  companySlogan: string;
  address: string;
  hotline: string;
  website: string;
  saleRepName: string;
  saleRepPhone: string;
  generalPolicy: string[];
  brandAccent: "GAMA" | "Lendo" | "Ares";
  representativeCode?: string;
}

// Render Gama interlocking new logo at module level
const GamaInterlockLogo = ({
  size = 48,
  variant = "mark",
  className = ""
}: {
  size?: number;
  variant?: "mark" | "horizontal" | "vertical";
  className?: string;
}) => {
  const src = variant === "horizontal"
    ? "/logos/logo-horizontal.png"
    : variant === "vertical"
      ? "/logos/logo-vertical.png"
      : "/logos/logo-mark.png";

  return (
    <img
      src={src}
      alt="Gama Logo"
      crossOrigin="anonymous"
      className={className}
      style={{ height: size, width: 'auto', objectFit: 'contain' }}
    />
  );
};

// AI processing loader with elapsed time count to provide premium loading feedback
const AIProcessingLoader = ({ status }: { status: "analyze" | "remove-bg" | null }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!status) return;
    setElapsed(0);
    const interval = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [status]);

  if (!status) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-slate-100 flex flex-col items-center space-y-5">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0D5235] to-amber-500 rounded-full animate-spin opacity-20 blur-md" style={{ animationDuration: '3s' }}></div>
          <div className="absolute inset-2 bg-[#0D5235] rounded-full animate-pulse"></div>
          <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center">
            <Sparkle className="w-8 h-8 text-[#0D5235] animate-bounce" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">
            {status === "analyze" ? "AI Đang Phân Tích Ảnh" : "AI Đang Tách Nền Ảnh"}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-[280px]">
            {status === "analyze"
              ? "Gemini đang tự động điền các thông tin sản phẩm chi tiết..."
              : "Gemini đang tính toán đường biên và tách nền vật thể..."}
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl px-5 py-2.5 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></div>
          <span className="text-xs font-mono font-bold text-slate-700">
            Thời gian xử lý: {elapsed} giây
          </span>
        </div>

        <p className="text-[10px] text-slate-400 leading-normal">
          Quá trình này có thể mất khoảng 15-30 giây. Vui lòng không đóng trình duyệt hoặc tải lại trang.
        </p>
      </div>
    </div>
  );
};

// Cryptographically random unique quote code generator to prevent duplication or fraud
const hexToRgba = (hex: string, alpha: number) => {
  const cleanHex = hex.replace("#", "");
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const generateUniqueQuoteCode = () => {
  const d = new Date();
  const yy = d.getFullYear().toString().slice(-2);
  const mm = (d.getMonth() + 1).toString().padStart(2, '0');
  const dd = d.getDate().toString().padStart(2, '0');
  const hh = d.getHours().toString().padStart(2, '0');
  const min = d.getMinutes().toString().padStart(2, '0');

  // High range random component (4-digit) to ensure uniqueness
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `GAMA-RE-${yy}${mm}${dd}-${hh}${min}-${rand}`;
};

// Canvas-based client-side background removal helper (chroma keying/background color subtraction)
const removeImageBackground = (base64Str: string, tolerance = 35): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(base64Str);
        return;
      }
      ctx.drawImage(img, 0, 0);
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Sample the four corner pixels to detect the background color
        const corners = [
          { r: data[0], g: data[1], b: data[2] }, // Top-Left
          { r: data[(canvas.width - 1) * 4], g: data[(canvas.width - 1) * 4 + 1], b: data[(canvas.width - 1) * 4 + 2] }, // Top-Right
          { r: data[(canvas.height - 1) * canvas.width * 4], g: data[(canvas.height - 1) * canvas.width * 4 + 1], b: data[(canvas.height - 1) * canvas.width * 4 + 2] }, // Bottom-Left
          { r: data[((canvas.height - 1) * canvas.width + canvas.width - 1) * 4], g: data[((canvas.height - 1) * canvas.width + canvas.width - 1) * 4 + 1], b: data[((canvas.height - 1) * canvas.width + canvas.width - 1) * 4 + 2] } // Bottom-Right
        ];

        // Average the corners to find the background color
        const bgR = Math.round(corners.reduce((sum, c) => sum + c.r, 0) / 4);
        const bgG = Math.round(corners.reduce((sum, c) => sum + c.g, 0) / 4);
        const bgB = Math.round(corners.reduce((sum, c) => sum + c.b, 0) / 4);

        // Scan all pixels and clear background pixels
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Calculate Euclidean distance in color space
          const dist = Math.sqrt(
            Math.pow(r - bgR, 2) +
            Math.pow(g - bgG, 2) +
            Math.pow(b - bgB, 2)
          );

          if (dist < tolerance) {
            // Set alpha to 0 (transparent)
            data[i + 3] = 0;
          }
        }

        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } catch (e) {
        console.error("Canvas read error:", e);
        resolve(base64Str);
      }
    };
    img.onerror = () => {
      resolve(base64Str);
    };
    img.src = base64Str;
  });
};

// Compress and resize base64 images client-side to fit within storage limits (max 800px longest side)
const resizeBase64Image = (base64Str: string, maxDim = 800): Promise<string> => {
  return new Promise((resolve) => {
    if (!base64Str.startsWith("data:image")) {
      resolve(base64Str);
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(base64Str);
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => {
      resolve(base64Str);
    };
    img.src = base64Str;
  });
};

// Client-side masking helper to clip a base64 image using normalized polygon coordinates from Gemini AI
const maskImageWithPolygon = (base64Str: string, points: { x: number; y: number }[]): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(base64Str);
        return;
      }

      ctx.beginPath();
      points.forEach((p, idx) => {
        const px = (p.x / 1000) * canvas.width;
        const py = (p.y / 1000) * canvas.height;
        if (idx === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      });
      ctx.closePath();

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.clip();
      ctx.drawImage(img, 0, 0);

      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => {
      resolve(base64Str);
    };
    img.src = base64Str;
  });
};

// Orchestrator to request AI segmentation mask from Gemini and apply canvas clip
const removeBgUsingGeminiAI = async (base64Str: string): Promise<string> => {
  try {
    const cleanBase64 = base64Str.split(",")[1] || base64Str;
    const mimeType = base64Str.split(";")[0].split(":")[1] || "image/jpeg";

    const res = await fetch("/api/gemini/remove-bg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageBase64: cleanBase64,
        mimeType: mimeType
      })
    });

    if (!res.ok) {
      throw new Error("Không thể kết nối đến máy chủ AI.");
    }

    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }

    if (data.points && Array.isArray(data.points) && data.points.length > 0) {
      return await maskImageWithPolygon(base64Str, data.points);
    }

    return base64Str;
  } catch (err) {
    console.error("Gemini AI background removal error:", err);
    throw err;
  }
};

// ==========================================
// Sample Data matching user's Reference Image
// ==========================================
const sampleProducts: Product[] = [
  {
    id: "1",
    productCode: "LDVX11LZ",
    productName: "Bộ tay xịt ti đồng, dây nhựa lưới 3 lớp",
    brand: "Lendo",
    price: 55000,
    unit: "Bộ",
    image: FIXTURE_SVGS.spray_blue,
    brightness: 100,
    contrast: 100,
    saturate: 100,
    rotation: 0,
    bgColor: "#f0f9ff",
    padding: 10,
    description: "Chất liệu ti đồng siêu bền, thiết kế dây nhựa 3 lớp chống xoắn cao cấp."
  },
  {
    id: "2",
    productCode: "LDVX11LV",
    productName: "Bộ tay xịt ti đồng, dây nhựa lưới 3 lớp (V)",
    brand: "Lendo",
    price: 64000,
    unit: "Bộ",
    image: FIXTURE_SVGS.spray_blue,
    brightness: 100,
    contrast: 100,
    saturate: 100,
    rotation: 0,
    bgColor: "#f0f9ff",
    padding: 10,
    description: "Mẫu vỏ đặc biệt cao cấp tăng áp lực nước."
  },
  {
    id: "3",
    productCode: "LDVX11TZ",
    productName: "Bộ tay xịt ti đồng, dây nhựa trắng 3 lớp",
    brand: "Lendo",
    price: 52000,
    unit: "Bộ",
    image: FIXTURE_SVGS.spray_blue,
    brightness: 100,
    contrast: 100,
    saturate: 100,
    rotation: 0,
    bgColor: "#ffffff",
    padding: 10,
    description: "Dây nhựa trắng mờ thẩm mỹ, lõi đồng nguyên chất chống rò rỉ."
  },
  {
    id: "4",
    productCode: "LDVX11TV",
    productName: "Bộ tay xịt ti đồng, dây nhựa trắng 3 lớp (V)",
    brand: "Lendo",
    price: 61000,
    unit: "Bộ",
    image: FIXTURE_SVGS.spray_blue,
    brightness: 100,
    contrast: 100,
    saturate: 100,
    rotation: 0,
    bgColor: "#ffffff",
    padding: 10,
  },
  {
    id: "5",
    productCode: "LDVX21LZ",
    productName: "Bộ tay xịt âm trắng mỏ xi ti đồng, dây nhựa lưới 3 lớp",
    brand: "Lendo",
    price: 62000,
    unit: "Bộ",
    image: FIXTURE_SVGS.spray_blue,
    brightness: 100,
    contrast: 100,
    saturate: 100,
    rotation: 0,
    bgColor: "#f0f9ff",
    padding: 10,
  },
  {
    id: "6",
    productCode: "LDVX21LV",
    productName: "Bộ tay xịt âm trắng mỏ xi ti đồng, dây nhựa lưới 3 lớp (V)",
    brand: "Lendo",
    price: 71000,
    unit: "Bộ",
    image: FIXTURE_SVGS.spray_blue,
    brightness: 100,
    contrast: 100,
    saturate: 100,
    rotation: 0,
    bgColor: "#f0f9ff",
    padding: 10,
  },
  {
    id: "7",
    productCode: "LDVX21TZ",
    productName: "Bộ tay xịt âm trắng mỏ xi ti đồng, dây nhựa trắng 3 lớp",
    brand: "Lendo",
    price: 59000,
    unit: "Bộ",
    image: FIXTURE_SVGS.spray_blue,
    brightness: 100,
    contrast: 100,
    saturate: 100,
    rotation: 0,
    bgColor: "#ffffff",
    padding: 10,
  },
  {
    id: "8",
    productCode: "LDVX21TV",
    productName: "Bộ tay xịt âm trắng mỏ xi ti đồng, dây nhựa trắng 3 lớp (V)",
    brand: "Lendo",
    price: 68000,
    unit: "Bộ",
    image: FIXTURE_SVGS.spray_blue,
    brightness: 100,
    contrast: 100,
    saturate: 100,
    rotation: 0,
    bgColor: "#ffffff",
    padding: 10,
  },
  {
    id: "9",
    productCode: "LDVX23TV",
    productName: "Bộ tay xịt âm mỏ ghi ti đồng, dây nhựa trắng 3 lớp",
    brand: "Lendo",
    price: 78000,
    unit: "Bộ",
    image: FIXTURE_SVGS.spray_gray,
    brightness: 100,
    contrast: 100,
    saturate: 100,
    rotation: 0,
    bgColor: "#f1f5f9",
    padding: 10,
  },
  {
    id: "10",
    productCode: "LDVX23TZ",
    productName: "Bộ tay xịt âm mỏ ghi ti đồng, dây nhựa trắng 3 lớp (Z)",
    brand: "Lendo",
    price: 69000,
    unit: "Bộ",
    image: FIXTURE_SVGS.spray_gray,
    brightness: 100,
    contrast: 100,
    saturate: 100,
    rotation: 0,
    bgColor: "#f1f5f9",
    padding: 10,
  },
  {
    id: "11",
    productCode: "LDVX23LV",
    productName: "Bộ tay xịt âm mỏ ghi ti đồng, dây nhựa lưới 3 lớp",
    brand: "Lendo",
    price: 81000,
    unit: "Bộ",
    image: FIXTURE_SVGS.spray_gray,
    brightness: 100,
    contrast: 100,
    saturate: 100,
    rotation: 0,
    bgColor: "#f1f5f9",
    padding: 10,
  },
  {
    id: "12",
    productCode: "LDVX23LZ",
    productName: "Bộ tay xịt âm mỏ ghi ti đồng, dây nhựa lưới 3 lớp (Z)",
    brand: "Lendo",
    price: 72000,
    unit: "Bộ",
    image: FIXTURE_SVGS.spray_gray,
    brightness: 100,
    contrast: 100,
    saturate: 100,
    rotation: 0,
    bgColor: "#f1f5f9",
    padding: 10,
  },
  {
    id: "13",
    productCode: "LDVX22IZ",
    productName: "Bộ tay xịt xi âm ti đồng, dây inox nhuyễn",
    brand: "Lendo",
    price: 90000,
    unit: "Bộ",
    image: FIXTURE_SVGS.faucet_gold,
    brightness: 100,
    contrast: 100,
    saturate: 100,
    rotation: 0,
    bgColor: "#fffbeb",
    padding: 10,
  },
  {
    id: "14",
    productCode: "LDVX22IV",
    productName: "Bộ tay xịt xi âm ti đồng, dây inox nhuyễn (V)",
    brand: "Lendo",
    price: 99000,
    unit: "Bộ",
    image: FIXTURE_SVGS.faucet_gold,
    brightness: 100,
    contrast: 100,
    saturate: 100,
    rotation: 0,
    bgColor: "#fffbeb",
    padding: 10,
  }
];

function PageContent() {
  // ==========================================
  // React State Configuration
  // ==========================================
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [selectedProductId, setSelectedProductId] = useState<string>(sampleProducts[0]?.id || "");
  const [activeTab, setActiveTab] = useState<"general" | "products" | "image">("general");
  const [template, setTemplate] = useState<"enterprise" | "bento" | "poster">("enterprise");
  const [zoom, setZoom] = useState<number>(85); // percentage
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiStatus, setAiStatus] = useState<"analyze" | "remove-bg" | null>(null);
  const [exportedImageUrl, setExportedImageUrl] = useState<string | null>(null);

  // Responsive zoom detector for mobile
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setZoom(45);
    }
  }, []);

  // General Company/Quotation details
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
    title: "BIỂU GIÁ KHUYẾN MÃI VÀ ƯU ĐÃI SẢN PHẨM",
    subtitle: "(Áp dụng từ ngày 14/07/2026)",
    recipient: "Quý Khách Hàng / Quý Đại Lý",
    date: "14/07/2026",
    companyName: "GAMA GROUP CO., LTD",
    companySlogan: "",
    address: "VPKD: 54/6E Ấp Tiền Lân, Xã Bà Điểm, Huyện Hóc Môn, TP.HCM",
    hotline: "Hotline: 0902 949 946 - 0934 077 239",
    website: "Website: gama.vn",
    saleRepName: "Nguyễn Văn Nam",
    saleRepPhone: "0902.949.946",
    generalPolicy: [
      "Dưới 10 BỘ: Chiết khấu 10%",
      "Từ 10 BỘ: Chiết khấu 15%",
      "Từ 20 BỘ: Chiết khấu 18%"
    ],
    brandAccent: "GAMA",
    representativeCode: generateUniqueQuoteCode()
  });

  // Reference to preview container for exporting
  const previewRef = useRef<HTMLDivElement>(null);
  const isLoaded = useRef(false);
  const html2canvasRef = useRef<any>(null);
  const jsPdfRef = useRef<any>(null);

  // Pre-load libraries to avoid ChunkLoadError when exporting
  useEffect(() => {
    import("html2canvas-pro").then((m) => {
      html2canvasRef.current = m.default;
    }).catch(err => console.error("Failed to pre-load html2canvas-pro", err));

    import("jspdf").then((m) => {
      jsPdfRef.current = m.jsPDF;
    }).catch(err => console.error("Failed to pre-load jspdf", err));
  }, []);

  // Load from local storage or set defaults on mount
  useEffect(() => {
    // Defer state updates to avoid synchronous setState warning inside useEffect during commit phase
    const timer = setTimeout(() => {
      const savedProducts = localStorage.getItem("gama_quote_products");
      const savedGeneral = localStorage.getItem("gama_quote_general");
      const savedTemplate = localStorage.getItem("gama_quote_template");

      if (savedProducts) {
        try {
          const parsed = JSON.parse(savedProducts) as Product[];

          // Asynchronously migrate and optimize any legacy large images in local storage
          const optimizeLoadedProducts = async () => {
            let needsSave = false;
            const optimized = await Promise.all(parsed.map(async p => {
              if (p.image && p.image.startsWith("data:image") && p.image.length > 200000) {
                try {
                  const resized = await resizeBase64Image(p.image, 800);
                  needsSave = true;
                  return { ...p, image: resized, originalImage: undefined };
                } catch (err) {
                  return p;
                }
              }
              return p;
            }));

            if (needsSave) {
              setProducts(optimized);
              try {
                const sanitized = optimized.map(({ originalImage, ...rest }) => rest);
                localStorage.setItem("gama_quote_products", JSON.stringify(sanitized));
              } catch (err) { }
            }
          };

          setProducts(parsed);
          if (parsed.length > 0) setSelectedProductId(parsed[0].id);
          optimizeLoadedProducts();
        } catch (e) {
          setProducts(sampleProducts);
          setSelectedProductId(sampleProducts[0].id);
        }
      } else {
        setProducts(sampleProducts);
        setSelectedProductId(sampleProducts[0].id);
      }

      if (savedGeneral) {
        try {
          const parsed = JSON.parse(savedGeneral);
          // Auto-migrate old default fields to the requested clean and simple GAMA info
          if (
            parsed.companyName === "CÔNG TY TNHH TẬP ĐOÀN GAMA" ||
            parsed.address === "ADRESS" ||
            parsed.hotline === "HOTLINE" ||
            parsed.companySlogan !== ""
          ) {
            parsed.companyName = "GAMA GROUP CO., LTD";
            parsed.address = "VPKD: 54/6E Ấp Tiền Lân, Xã Bà Điểm, Huyện Hóc Môn, TP.HCM";
            parsed.hotline = "Hotline: 0902 949 946 - 0934 077 239";
            parsed.website = "Website: gama.vn";
            parsed.companySlogan = "";
          }
          if (!parsed.representativeCode) {
            parsed.representativeCode = generateUniqueQuoteCode();
          }
          setGeneralInfo(parsed);
        } catch (e) { }
      }

      if (savedTemplate) {
        setTemplate(savedTemplate as any);
      }
      isLoaded.current = true;
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Sync state to local storage on edits
  useEffect(() => {
    if (isLoaded.current) {
      try {
        // Strip originalImage to save substantial storage footprint inside localStorage
        const sanitizedProducts = products.map(({ originalImage, ...rest }) => rest);
        localStorage.setItem("gama_quote_products", JSON.stringify(sanitizedProducts));
      } catch (err: any) {
        console.error("Local storage sync error:", err);
        if (err.name === "QuotaExceededError" || err.code === 22) {
          triggerNotification(
            "Bộ nhớ trình duyệt đầy! Hãy xóa bớt sản phẩm cũ hoặc tải ảnh có dung lượng nhỏ hơn.",
            "error"
          );
        }
      }
    }
  }, [products]);

  useEffect(() => {
    if (isLoaded.current) {
      localStorage.setItem("gama_quote_general", JSON.stringify(generalInfo));
    }
  }, [generalInfo]);

  useEffect(() => {
    if (isLoaded.current) {
      localStorage.setItem("gama_quote_template", template);
    }
  }, [template]);

  // Show auto-dismiss notifications
  const triggerNotification = (message: string, type: "success" | "error" | "info" = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Find currently selected product for Image lab tab
  const selectedProduct = useMemo(() => {
    return products.find(p => p.id === selectedProductId) || products[0];
  }, [products, selectedProductId]);

  // ==========================================
  // Helper Functions & Handlers
  // ==========================================

  // Load initial sample data (Limited to 5 products for Demo)
  const handleLoadSampleData = () => {
    const demoProducts = sampleProducts.slice(0, 5);
    setProducts(demoProducts);
    setSelectedProductId(demoProducts[0].id);
    triggerNotification("Đã tải dữ liệu mẫu thành công với 5 sản phẩm GAMA!", "success");
  };

  // Clear products list
  const handleClearAllProducts = () => {
    setProducts([]);
    setSelectedProductId("");
    triggerNotification("Đã dọn dẹp danh sách sản phẩm.", "info");
  };

  // Add new product row
  const handleAddProduct = () => {
    const newId = String(Date.now());
    const newProduct: Product = {
      id: newId,
      productCode: `GM-${products.length + 101}`,
      productName: "Sản phẩm mới chưa đặt tên",
      brand: "GAMA",
      price: 150000,
      unit: "Bộ",
      image: FIXTURE_SVGS.faucet_green,
      brightness: 100,
      contrast: 100,
      saturate: 100,
      rotation: 0,
      bgColor: "#ffffff",
      padding: 12
    };

    setProducts([...products, newProduct]);
    setSelectedProductId(newId);
    setActiveTab("products");
    triggerNotification("Đã thêm một dòng sản phẩm mới!", "success");
  };

  // Delete product row
  const handleDeleteProduct = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const filtered = products.filter(p => p.id !== id);
    setProducts(filtered);
    if (selectedProductId === id) {
      setSelectedProductId(filtered.length > 0 ? filtered[0].id : "");
    }
    triggerNotification("Đã xóa sản phẩm.", "info");
  };

  // Move product row up
  const handleMoveUp = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (index === 0) return;
    const newProducts = [...products];
    const temp = newProducts[index];
    newProducts[index] = newProducts[index - 1];
    newProducts[index - 1] = temp;
    setProducts(newProducts);
  };

  // Move product row down
  const handleMoveDown = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (index === products.length - 1) return;
    const newProducts = [...products];
    const temp = newProducts[index];
    newProducts[index] = newProducts[index + 1];
    newProducts[index + 1] = temp;
    setProducts(newProducts);
  };

  // Update specific field on any product
  const updateProductField = (id: string, field: keyof Product, value: any) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, [field]: value };
      }
      return p;
    }));
  };

  // Handle uploading product image
  const handleImageUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      if (e.target?.result) {
        try {
          let rawBase64 = e.target.result as string;

          triggerNotification("Đang xử lý tối ưu hóa dung lượng ảnh...", "info");
          // Resize to maximum 800px to optimize storage footprint
          rawBase64 = await resizeBase64Image(rawBase64, 800);

          setProducts(prev => prev.map(p => {
            if (p.id === id) {
              return {
                ...p,
                image: rawBase64,
                originalImage: rawBase64,
                isBgRemoved: false,
                isCustomImage: true
              };
            }
            return p;
          }));
          triggerNotification("Đã tải ảnh lên thành công!", "success");
        } catch (err) {
          console.error("Image upload error:", err);
          triggerNotification("Lỗi khi tải hoặc xử lý ảnh sản phẩm.", "error");
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Dynamic color palette generator based on brand accent selection
  const getBrandColors = (brand: "GAMA" | "Lendo" | "Ares") => {
    switch (brand) {
      case "GAMA":
        return {
          primary: "#0D5235", // Deep GAMA Green
          secondary: "#A88C52", // Warm Gold
          light: "#f0fdf4",
          border: "border-[#0D5235]/20",
          text: "text-[#0D5235]",
          accentBg: "bg-[#0D5235]/10",
          bannerBg: "from-[#0D5235] to-[#0D5235]/95",
          priceText: "text-red-600"
        };
      case "Lendo":
        return {
          primary: "#0284C7", // Sky Blue
          secondary: "#F59E0B", // Amber Gold
          light: "#f0f9ff",
          border: "border-sky-500/20",
          text: "text-sky-900",
          accentBg: "bg-sky-500/10",
          bannerBg: "from-sky-800 to-sky-950",
          priceText: "text-red-600"
        };
      case "Ares":
        return {
          primary: "#DB2777", // Vibrant Pink
          secondary: "#F43F5E", // Rose/Pink accent
          light: "#fdf2f8", // Pink-50
          border: "border-pink-200",
          text: "text-pink-950",
          accentBg: "bg-pink-500/10",
          bannerBg: "from-pink-800 to-pink-950",
          priceText: "text-pink-600"
        };
    }
  };

  const colors = getBrandColors(generalInfo.brandAccent);

  // ==========================================
  // Image Enhancements: Brightness/Contrast Canvas Filter Apply
  // ==========================================
  const applyInstantFilter = (preset: "default" | "bright" | "warm" | "vibrant" | "studio") => {
    if (!selectedProductId) return;

    let brightness = 100;
    let contrast = 100;
    let saturate = 100;
    let bgColor = "#ffffff";

    switch (preset) {
      case "bright":
        brightness = 115;
        contrast = 108;
        saturate = 95;
        bgColor = "#ffffff";
        break;
      case "warm":
        brightness = 105;
        contrast = 102;
        saturate = 110;
        bgColor = "#fffbeb"; // soft cream
        break;
      case "vibrant":
        brightness = 100;
        contrast = 112;
        saturate = 125;
        bgColor = "#f0fdf4"; // soft mint green
        break;
      case "studio":
        brightness = 120;
        contrast = 115;
        saturate = 90;
        bgColor = "#f8fafc"; // studio slate white
        break;
      default:
        brightness = 100;
        contrast = 100;
        saturate = 100;
        bgColor = "#ffffff";
    }

    setProducts(prev => prev.map(p => {
      if (p.id === selectedProductId) {
        return { ...p, brightness, contrast, saturate, bgColor };
      }
      return p;
    }));
    triggerNotification(`Đã áp dụng bộ lọc ${preset === "default" ? "Gốc" : preset.toUpperCase()}`);
  };

  // AI-Powered Product Analysis (Gemini API Integration)
  const handleAiProductAnalysis = async (prodId: string) => {
    const targetProduct = products.find(p => p.id === prodId);
    if (!targetProduct) return;

    if (!targetProduct.image || !targetProduct.isCustomImage) {
      triggerNotification("Hãy tải lên một ảnh sản phẩm thực tế để AI xử lý!", "error");
      return;
    }

    setIsAiLoading(true);
    setAiStatus("analyze");
    triggerNotification("Gemini AI đang xử lý, xin vui lòng đợi...", "info");

    try {
      // Extract clean Base64 data (without prefix)
      const base64Data = targetProduct.image.split(",")[1] || targetProduct.image;
      const mimeType = targetProduct.image.split(";")[0].split(":")[1] || "image/jpeg";

      const res = await fetch("/api/gemini/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: base64Data,
          mimeType: mimeType
        })
      });

      if (!res.ok) {
        throw new Error("Không thể kết nối đến máy chủ AI.");
      }

      const aiData = await res.json();

      if (aiData.error) {
        throw new Error(aiData.error);
      }

      // Update product fields with smart results
      setProducts(prev => prev.map(p => {
        if (p.id === prodId) {
          return {
            ...p,
            productCode: aiData.productCode || p.productCode,
            productName: aiData.productName || p.productName,
            brand: aiData.brand || p.brand,
            price: aiData.price || p.price,
            unit: aiData.unit || p.unit,
            description: aiData.description || p.description || ""
          };
        }
        return p;
      }));

      triggerNotification("Đã có dữ liệu từ AI! Tự động cập nhật thông tin sản phẩm.", "success");
    } catch (err: any) {
      console.error(err);
      triggerNotification(`Lỗi xử lý AI: ${err.message || "Vui lòng thử lại sau."}`, "error");
    } finally {
      setIsAiLoading(false);
      setAiStatus(null);
    }
  };

  // ==========================================
  // High-Quality File Exporter Engine
  // ==========================================
  const [isExporting, setIsExporting] = useState(false);

  const exportAsImage = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    triggerNotification("Đang kết xuất và tối ưu hóa hình ảnh độ phân giải cao...", "info");

    // Temporarily reset zoom to 100% for pristine output scale
    const originalZoom = zoom;
    setZoom(100);

    // Wait short frame for layout recalculation
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      const html2canvas = html2canvasRef.current || (await import("html2canvas-pro")).default;
      const canvas = await html2canvas(previewRef.current, {
        scale: 2.2, // crisp, professional quality
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        onclone: (clonedDoc: any) => {
          // Fix color rendering issues in html2canvas by resolving oklch & CSS variable colors to standard formats
          const canvasHelper = clonedDoc.createElement('canvas');
          canvasHelper.width = 1;
          canvasHelper.height = 1;
          const ctx = canvasHelper.getContext('2d');

          if (ctx) {
            const resolveColor = (colorStr: string) => {
              if (!colorStr || colorStr === 'transparent' || colorStr === 'rgba(0, 0, 0, 0)') return colorStr;
              try {
                ctx.fillStyle = colorStr;
                return ctx.fillStyle;
              } catch (e) {
                return colorStr;
              }
            };

            const elements = clonedDoc.querySelectorAll('*');
            elements.forEach((el: any) => {
              const computedStyle = window.getComputedStyle(el);

              // Resolve background color if it has oklch or is dynamic
              const bg = computedStyle.backgroundColor;
              if (bg && (bg.includes('oklch') || bg.includes('var('))) {
                el.style.backgroundColor = resolveColor(bg);
              }

              // Resolve text color
              const textCol = computedStyle.color;
              if (textCol && (textCol.includes('oklch') || textCol.includes('var('))) {
                el.style.color = resolveColor(textCol);
              }

              // Resolve individual border colors (browsers return empty string for shorthand borderColor)
              const borderTop = computedStyle.borderTopColor;
              if (borderTop && (borderTop.includes('oklch') || borderTop.includes('var('))) {
                el.style.borderTopColor = resolveColor(borderTop);
              }
              const borderRight = computedStyle.borderRightColor;
              if (borderRight && (borderRight.includes('oklch') || borderRight.includes('var('))) {
                el.style.borderRightColor = resolveColor(borderRight);
              }
              const borderBottom = computedStyle.borderBottomColor;
              if (borderBottom && (borderBottom.includes('oklch') || borderBottom.includes('var('))) {
                el.style.borderBottomColor = resolveColor(borderBottom);
              }
              const borderLeft = computedStyle.borderLeftColor;
              if (borderLeft && (borderLeft.includes('oklch') || borderLeft.includes('var('))) {
                el.style.borderLeftColor = resolveColor(borderLeft);
              }
            });
          }
        }
      });

      const dataUrl = canvas.toDataURL("image/png");
      setExportedImageUrl(dataUrl);

      // Attempt direct download for desktop browsers
      const link = document.createElement("a");
      link.download = `BAO_GIA_GAMA_${generalInfo.date.replace(/\//g, "-")}.png`;
      link.href = dataUrl;
      link.click();

      triggerNotification("Đã tạo ảnh báo giá thành công!", "success");
    } catch (err) {
      console.error(err);
      triggerNotification("Có lỗi xảy ra khi xuất ảnh. Vui lòng thử lại.", "error");
    } finally {
      setZoom(originalZoom);
      setIsExporting(false);
    }
  };

  const exportAsPdf = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    triggerNotification("Đang thiết lập và biên soạn trang PDF A4 tiêu chuẩn...", "info");

    const originalZoom = zoom;
    setZoom(100);

    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      const html2canvas = html2canvasRef.current || (await import("html2canvas-pro")).default;
      const jsPDF = jsPdfRef.current || (await import("jspdf")).jsPDF;

      const canvas = await html2canvas(previewRef.current, {
        scale: 2.0,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        onclone: (clonedDoc: any) => {
          // Fix color rendering issues in html2canvas by resolving oklch & CSS variable colors to standard formats
          const canvasHelper = clonedDoc.createElement('canvas');
          canvasHelper.width = 1;
          canvasHelper.height = 1;
          const ctx = canvasHelper.getContext('2d');

          if (ctx) {
            const resolveColor = (colorStr: string) => {
              if (!colorStr || colorStr === 'transparent' || colorStr === 'rgba(0, 0, 0, 0)') return colorStr;
              try {
                ctx.fillStyle = colorStr;
                return ctx.fillStyle;
              } catch (e) {
                return colorStr;
              }
            };

            const elements = clonedDoc.querySelectorAll('*');
            elements.forEach((el: any) => {
              const computedStyle = window.getComputedStyle(el);

              // Resolve background color if it has oklch or is dynamic
              const bg = computedStyle.backgroundColor;
              if (bg && (bg.includes('oklch') || bg.includes('var('))) {
                el.style.backgroundColor = resolveColor(bg);
              }

              // Resolve text color
              const textCol = computedStyle.color;
              if (textCol && (textCol.includes('oklch') || textCol.includes('var('))) {
                el.style.color = resolveColor(textCol);
              }

              // Resolve individual border colors (browsers return empty string for shorthand borderColor)
              const borderTop = computedStyle.borderTopColor;
              if (borderTop && (borderTop.includes('oklch') || borderTop.includes('var('))) {
                el.style.borderTopColor = resolveColor(borderTop);
              }
              const borderRight = computedStyle.borderRightColor;
              if (borderRight && (borderRight.includes('oklch') || borderRight.includes('var('))) {
                el.style.borderRightColor = resolveColor(borderRight);
              }
              const borderBottom = computedStyle.borderBottomColor;
              if (borderBottom && (borderBottom.includes('oklch') || borderBottom.includes('var('))) {
                el.style.borderBottomColor = resolveColor(borderBottom);
              }
              const borderLeft = computedStyle.borderLeftColor;
              if (borderLeft && (borderLeft.includes('oklch') || borderLeft.includes('var('))) {
                el.style.borderLeftColor = resolveColor(borderLeft);
              }
            });
          }
        }
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.98);

      // Standard A4 dimensions
      const imgWidth = 210; // mm
      const pageHeight = 297; // mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF("p", "mm", "a4");
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Handle multi-page overflow seamlessly
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`BAO_GIA_GAMA_${generalInfo.date.replace(/\//g, "-")}.pdf`);
      triggerNotification("Đã xuất bản và tải về file báo giá dạng PDF thành công!", "success");
    } catch (err) {
      console.error(err);
      triggerNotification("Có lỗi xảy ra khi xuất PDF.", "error");
    } finally {
      setZoom(originalZoom);
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // ==========================================
  // Inline edit handlers in Preview
  // ==========================================
  const handleInlineEditProduct = (id: string, field: "productCode" | "productName" | "price" | "unit" | "description", value: string) => {
    if (field === "price") {
      const numeric = parseInt(value.replace(/[^0-9]/g, "")) || 0;
      updateProductField(id, field, numeric);
    } else {
      updateProductField(id, field, value);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative font-sans">

      {/* Dynamic Floating Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl transition-all duration-300 border backdrop-blur-md animate-bounce
            ${notification.type === "success" ? "bg-[#0D5235]/95 border-[#0D5235] text-white" : ""}
            ${notification.type === "error" ? "bg-red-500/95 border-red-400 text-white" : ""}
            ${notification.type === "info" ? "bg-[#0D5235]/95 border-[#0D5235] text-white" : ""}`}
        >
          {notification.type === "success" && <Check className="w-5 h-5 shrink-0" />}
          {notification.type === "info" && <Info className="w-5 h-5 shrink-0" />}
          <span className="font-medium text-sm text-white">{notification.message}</span>
        </div>
      )}

      {/* TOP HEADER BRAND BAR */}
      <header className="bg-white border-b border-slate-200 text-slate-800 px-6 py-4 sticky top-0 z-40 flex flex-wrap justify-between items-center gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="bg-[#0D5235]/5 p-1.5 rounded-xl border border-[#0D5235]/10 flex items-center justify-center">
            <GamaInterlockLogo size={34} />
          </div>
          <div>
            <h1 className="text-lg font-bold font-display tracking-tight text-slate-900 flex items-center gap-2">
              GAMA Quote Studio <span className="text-xs bg-[#0D5235]/10 text-[#0D5235] px-2.5 py-0.5 rounded-full border border-[#0D5235]/20">v2.1</span>
            </h1>
            <p className="text-xs text-slate-500">Trình tạo bảng báo giá thông minh & đồng bộ nhận diện mới</p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLoadSampleData}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all border border-slate-200"
            title="Nạp lại sản phẩm mẫu"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Nạp sản phẩm mẫu (5SP)</span>
          </button>

          <button
            onClick={handleClearAllProducts}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-all border border-rose-200"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
            <span>Xóa hết sản phẩm</span>
          </button>

          <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

          {/* Zoom controls */}
          <div className="hidden lg:flex items-center bg-slate-50 rounded-lg px-2 py-1 text-slate-600 border border-slate-200">
            <button
              onClick={() => setZoom(z => Math.max(50, z - 10))}
              className="p-1 hover:text-slate-900 transition-all"
              title="Thu nhỏ xem toàn cảnh"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono px-2 font-semibold w-10 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom(z => Math.min(150, z + 10))}
              className="p-1 hover:text-slate-900 transition-all"
              title="Phóng to chỉnh sửa chi tiết"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* CORE SPLIT INTERFACE */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-y-auto min-h-0 bg-[#F8F9FA]">

        {/* LEFT WORKSPACE: EDIT CONTROLS & PHOTO LAB */}
        <section className="lg:col-span-5 bg-white border-r border-slate-200 flex flex-col min-h-[500px] lg:h-[calc(100vh-73px)] text-slate-800 shadow-sm overflow-y-auto">

          {/* TAB BAR NAVIGATION */}
          <div className="grid grid-cols-3 bg-slate-50 p-1.5 border-b border-slate-200 text-center text-xs font-medium sticky top-0 z-20">
            <button
              onClick={() => setActiveTab("general")}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 rounded-lg transition-all ${activeTab === "general" ? "bg-white text-slate-900 font-bold border border-slate-200 shadow-sm" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"}`}
            >
              <FileText className="w-4 h-4" />
              <span>Chung</span>
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 rounded-lg transition-all ${activeTab === "products" ? "bg-white text-slate-900 font-bold border border-slate-200 shadow-sm" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"}`}
            >
              <Layers className="w-4 h-4" />
              <span>Danh sách</span>
            </button>
            <button
              onClick={() => setActiveTab("image")}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 rounded-lg transition-all ${activeTab === "image" ? "bg-white text-slate-900 font-bold border border-slate-200 shadow-sm" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"}`}
            >
              <Sliders className="w-4 h-4" />
              <span>Xử lý ảnh</span>
            </button>
          </div>

          <div className="p-6 flex-1 space-y-6">

            {/* TAB 1: GENERAL SYSTEM SETTINGS */}
            {activeTab === "general" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Palette className="w-5 h-5 text-[#0D5235]" />
                  <h2 className="text-base font-bold text-slate-900">Cấu hình thông tin & Nhận diện</h2>
                </div>

                {/* Brand Theme Choice */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Màu chủ đạo (Tông màu & Thiết kế)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: "GAMA", title: "Tập Đoàn GAMA", desc: "Xanh lá - Vàng kim", color: "bg-[#0D5235]" },
                      { key: "Lendo", title: "Lendo Brand", desc: "Xanh dương - Cam", color: "bg-sky-600" },
                      { key: "Ares", title: "Ares Brand", desc: "Tông hồng thời thượng", color: "bg-pink-500" }
                    ].map(b => (
                      <button
                        key={b.key}
                        onClick={() => setGeneralInfo({ ...generalInfo, brandAccent: b.key as any })}
                        className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${generalInfo.brandAccent === b.key ? "border-slate-900 bg-slate-900 text-white shadow-lg ring-2 ring-slate-900/10" : "border-slate-200 bg-slate-50 hover:bg-slate-100/60"}`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`w-3 h-3 rounded-full ${b.color}`}></span>
                          <span className={`font-bold text-xs ${generalInfo.brandAccent === b.key ? "text-white" : "text-slate-800"}`}>{b.key}</span>
                        </div>
                        <p className={`text-[10px] ${generalInfo.brandAccent === b.key ? "text-slate-300" : "text-slate-500"}`}>{b.desc}</p>
                        {generalInfo.brandAccent === b.key && (
                          <div className="absolute top-1 right-1 bg-white text-slate-900 p-0.5 rounded-full">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* General Info Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Tiêu đề bảng báo giá</label>
                    <input
                      type="text"
                      value={generalInfo.title}
                      onChange={(e) => setGeneralInfo({ ...generalInfo, title: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                      placeholder="Vd: CHÍNH SÁCH KHUYẾN MÃI"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Phụ đề (Áp dụng từ)</label>
                    <input
                      type="text"
                      value={generalInfo.subtitle}
                      onChange={(e) => setGeneralInfo({ ...generalInfo, subtitle: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                      placeholder="Vd: (Áp dụng từ ngày 10/07/2026)"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Kính gửi / Đối tượng</label>
                    <input
                      type="text"
                      value={generalInfo.recipient}
                      onChange={(e) => setGeneralInfo({ ...generalInfo, recipient: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                      placeholder="Vd: Quý Đại Lý / Quý Khách"
                    />
                  </div>
                </div>

                {/* Sales Representative Block */}
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200/80 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-100 pb-1.5">Quản lý Kinh doanh / Nhân viên Sale</h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Họ tên nhân viên</label>
                      <input
                        type="text"
                        value={generalInfo.saleRepName}
                        onChange={(e) => setGeneralInfo({ ...generalInfo, saleRepName: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Số điện thoại</label>
                      <input
                        type="text"
                        value={generalInfo.saleRepPhone}
                        onChange={(e) => setGeneralInfo({ ...generalInfo, saleRepPhone: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-slate-400"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <label className="block text-[10px] text-slate-400 mb-1">Mã Đại Diện (Bảo mật chống giả mạo)</label>
                      <input
                        type="text"
                        value={generalInfo.representativeCode || ""}
                        onChange={(e) => setGeneralInfo({ ...generalInfo, representativeCode: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs font-mono font-bold text-[#0D5235] focus:outline-none focus:border-slate-400"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setGeneralInfo({ ...generalInfo, representativeCode: generateUniqueQuoteCode() })}
                      className="mt-5 px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all flex items-center gap-1 font-semibold border border-slate-200"
                      title="Tạo mã đại diện ngẫu nhiên bảo mật mới"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Đổi mã</span>
                    </button>
                  </div>
                </div>

                {/* Discount Policy list editor */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-500">Định mức chiết khấu / Chính sách bán lẻ & sỉ</label>
                  <div className="space-y-1.5">
                    {generalInfo.generalPolicy.map((policy, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-mono w-5">#{idx + 1}</span>
                        <input
                          type="text"
                          value={policy}
                          onChange={(e) => {
                            const updated = [...generalInfo.generalPolicy];
                            updated[idx] = e.target.value;
                            setGeneralInfo({ ...generalInfo, generalPolicy: updated });
                          }}
                          className="flex-1 bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-slate-400"
                        />
                        <button
                          onClick={() => {
                            const updated = generalInfo.generalPolicy.filter((_, i) => i !== idx);
                            setGeneralInfo({ ...generalInfo, generalPolicy: updated });
                          }}
                          className="text-rose-500 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setGeneralInfo({ ...generalInfo, generalPolicy: [...generalInfo.generalPolicy, "Chiết khấu đại lý mới: %"] })}
                    className="flex items-center gap-1 text-xs text-[#0D5235] hover:text-[#0D5235] font-bold mt-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Thêm mức chiết khấu</span>
                  </button>
                </div>

              </div>
            )}

            {/* TAB 2: PRODUCTS CATALOG MANAGER */}
            {activeTab === "products" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#0D5235]" />
                    <h2 className="text-base font-bold text-slate-900">Quản lý danh sách sản phẩm ({products.length})</h2>
                  </div>

                  <button
                    onClick={handleAddProduct}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0D5235] text-white font-bold rounded-lg text-xs hover:bg-[#0D5235]/90 transition-all shadow-md ring-2 ring-[#0D5235]/25 hover:scale-105"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Thêm SP</span>
                  </button>
                </div>

                {/* Compact Interactive Row-Based Product List */}
                {products.length === 0 ? (
                  <div className="text-center py-12 px-6 bg-slate-50/50 rounded-2xl border border-slate-200/80 border-dashed flex flex-col items-center justify-center space-y-5">
                    <div className="bg-[#0D5235]/10 p-4 rounded-full text-[#0D5235] animate-pulse">
                      <Layers className="w-8 h-8" />
                    </div>

                    <div className="space-y-1.5 max-w-xs">
                      <h3 className="text-sm font-extrabold text-slate-900">Danh sách trống</h3>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Bắt đầu biên soạn báo giá bằng cách thêm sản phẩm mới hoặc nạp dữ liệu mẫu của GAMA để xem thiết kế.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 w-full max-w-[240px] pt-2">
                      <button
                        onClick={handleAddProduct}
                        className="w-full py-2.5 bg-[#0D5235] hover:bg-[#0D5235]/90 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow transition-all hover:scale-[1.02]"
                      >
                        <Plus className="w-4 h-4 stroke-[3]" />
                        <span>Thêm sản phẩm đầu tiên</span>
                      </button>

                      <button
                        onClick={handleLoadSampleData}
                        className="w-full py-2.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all border border-slate-200"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                        <span>Nạp dữ liệu mẫu (5SP)</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                    {products.map((p, idx) => (
                      <div
                        key={p.id}
                        className={`rounded-xl border transition-all overflow-hidden ${selectedProductId === p.id ? "border-[#0D5235] bg-white shadow-md ring-1 ring-[#0D5235]/10" : "border-slate-200 bg-slate-50/50 hover:bg-slate-50"}`}
                      >
                        {/* HEADER: Click to toggle expansion */}
                        <div
                          onClick={() => setSelectedProductId(selectedProductId === p.id ? "" : p.id)}
                          className="p-3.5 flex items-center gap-3.5 cursor-pointer relative select-none"
                        >
                          {/* Compact thumbnail preview with color backing */}
                          <div
                            className="w-12 h-12 rounded-lg relative overflow-hidden shrink-0 border border-slate-200 flex items-center justify-center shadow-inner"
                            style={{ backgroundColor: p.bgColor }}
                          >
                            <img
                              src={p.image}
                              alt={p.productCode}
                              className="max-w-[85%] max-h-[85%] object-contain transition-all"
                              style={{
                                filter: `brightness(${p.brightness}%) contrast(${p.contrast}%) saturate(${p.saturate}%)`,
                                transform: `rotate(${p.rotation}deg) scale(${(p.scale || 100) / 100})`
                              }}
                            />
                          </div>

                          {/* Core Details */}
                          <div className="flex-1 min-w-0 space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-[#0D5235] truncate">{p.productCode}</span>
                              <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">{p.brand}</span>
                            </div>
                            <p className="text-xs font-semibold text-slate-800 truncate">{p.productName}</p>
                            <p className="text-xs text-[#0D5235] font-bold">{p.price.toLocaleString("vi-VN")} đ <span className="text-slate-400 font-normal">/ {p.unit}</span></p>
                          </div>

                          {/* Controls (Stop propagation to prevent card collapsing) */}
                          <div className="flex items-center gap-2 ml-1" onClick={(e) => e.stopPropagation()}>
                            <div className="flex flex-col gap-1">
                              <button
                                onClick={(e) => handleMoveUp(idx, e)}
                                disabled={idx === 0}
                                className="p-1 rounded bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-20 transition-all shadow-sm"
                                title="Di chuyển lên"
                              >
                                <ArrowUp className="w-2.5 h-2.5" />
                              </button>
                              <button
                                onClick={(e) => handleMoveDown(idx, e)}
                                disabled={idx === products.length - 1}
                                className="p-1 rounded bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-20 transition-all shadow-sm"
                                title="Di chuyển xuống"
                              >
                                <ArrowDown className="w-2.5 h-2.5" />
                              </button>
                            </div>

                            <button
                              onClick={(e) => handleDeleteProduct(p.id, e)}
                              className="p-1.5 rounded bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white transition-all shadow-sm"
                              title="Xóa dòng này"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            <ChevronRight className={`w-4 h-4 text-slate-400 transition-all duration-200 shrink-0 ${selectedProductId === p.id ? "rotate-90 text-[#0D5235]" : ""}`} />
                          </div>
                        </div>

                        {/* ACCORDION EXPANDED FORM */}
                        {selectedProductId === p.id && (
                          <div className="border-t border-slate-100 p-4 bg-slate-50/50 space-y-3.5 animate-fadeIn">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Mã sản phẩm</label>
                                <input
                                  type="text"
                                  value={p.productCode}
                                  onChange={(e) => updateProductField(p.id, "productCode", e.target.value)}
                                  className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#0D5235] focus:ring-1 focus:ring-[#0D5235]"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Thương hiệu</label>
                                <select
                                  value={p.brand}
                                  onChange={(e) => updateProductField(p.id, "brand", e.target.value)}
                                  className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#0D5235] focus:ring-1 focus:ring-[#0D5235]"
                                >
                                  <option value="GAMA">GAMA</option>
                                  <option value="Lendo">Lendo</option>
                                  <option value="Ares">Ares</option>
                                </select>
                              </div>

                              <div className="col-span-2">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tên sản phẩm</label>
                                <input
                                  type="text"
                                  value={p.productName}
                                  onChange={(e) => updateProductField(p.id, "productName", e.target.value)}
                                  className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#0D5235] focus:ring-1 focus:ring-[#0D5235]"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Giá bán lẻ (VNĐ)</label>
                                <input
                                  type="number"
                                  value={p.price}
                                  onChange={(e) => updateProductField(p.id, "price", parseInt(e.target.value) || 0)}
                                  className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#0D5235] focus:ring-1 focus:ring-[#0D5235]"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Đơn vị tính (ĐVT)</label>
                                <input
                                  type="text"
                                  value={p.unit}
                                  onChange={(e) => updateProductField(p.id, "unit", e.target.value)}
                                  className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#0D5235] focus:ring-1 focus:ring-[#0D5235]"
                                />
                              </div>

                              <div className="col-span-2">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Mô tả sản phẩm / Chi tiết kỹ thuật</label>
                                <textarea
                                  value={p.description || ""}
                                  onChange={(e) => updateProductField(p.id, "description", e.target.value)}
                                  rows={2}
                                  placeholder="Mô tả chất liệu, đặc tính kỹ thuật..."
                                  className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#0D5235] focus:ring-1 focus:ring-[#0D5235] resize-none"
                                />
                              </div>
                            </div>

                            {/* Image Controls inside the product card */}
                            <div className="flex gap-2 pt-2 border-t border-slate-100/60 mt-2">
                              <div className="flex-1 relative">
                                <input
                                  type="file"
                                  id={`img-uploader-${p.id}`}
                                  accept="image/*"
                                  onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                      handleImageUpload(p.id, e.target.files[0]);
                                    }
                                  }}
                                  className="hidden"
                                />
                                <label
                                  htmlFor={`img-uploader-${p.id}`}
                                  className="w-full py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-lg text-xs text-center block cursor-pointer border border-slate-200 flex items-center justify-center gap-1.5 transition-all shadow-sm"
                                >
                                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                                  <span>Tải ảnh sản phẩm</span>
                                </label>
                              </div>

                              <button
                                onClick={() => handleAiProductAnalysis(p.id)}
                                disabled={isAiLoading}
                                className="px-4 py-2 bg-[#0D5235] hover:bg-[#0D5235]/90 disabled:opacity-40 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                                title="Dùng AI phân tích hình ảnh và điền tự động"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>AI Tự điền</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}


              </div>
            )}

            {/* TAB 3: CUSTOM IMAGE PROCESSING LAB */}
            {activeTab === "image" && (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Sliders className="w-5 h-5 text-[#0D5235]" />
                  <h2 className="text-base font-bold text-slate-900">Sửa ảnh sản phẩm</h2>
                </div>

                {!selectedProductId ? (
                  <div className="text-center py-10 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 text-xs">
                    Vui lòng chọn hoặc thêm một sản phẩm để tiến hành xử lý hình ảnh!
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* Active product highlight header */}
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div
                        className="w-10 h-10 rounded bg-white flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden"
                        style={{ backgroundColor: selectedProduct.bgColor }}
                      >
                        <img
                          src={selectedProduct.image}
                          alt=""
                          className="max-w-[90%] max-h-[90%] object-contain"
                          style={{
                            filter: `brightness(${selectedProduct.brightness}%) contrast(${selectedProduct.contrast}%) saturate(${selectedProduct.saturate}%)`,
                            transform: `rotate(${selectedProduct.rotation}deg) scale(${(selectedProduct.scale || 100) / 100})`
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-400 font-mono">{selectedProduct.productCode}</p>
                        <p className="text-xs text-slate-800 truncate font-medium">{selectedProduct.productName}</p>
                      </div>
                    </div>

                    {/* Predefined Instant Filter Presets */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-2">Bộ lọc nhanh (Studio Presets)</label>
                      <div className="grid grid-cols-5 gap-1.5">
                        {[
                          { key: "default", name: "Gốc" },
                          { key: "bright", name: "Sáng" },
                          { key: "warm", name: "Ấm áp" },
                          { key: "vibrant", name: "Đậm" },
                          { key: "studio", name: "Phòng" }
                        ].map(item => (
                          <button
                            key={item.key}
                            onClick={() => applyInstantFilter(item.key as any)}
                            className="bg-white border border-slate-200 hover:border-slate-900 text-slate-600 py-1.5 px-1 rounded text-[10px] font-semibold transition-all hover:text-slate-900"
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Background Removal Tools */}
                    {selectedProduct.isCustomImage && (
                      <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Tách nền tự động (AI-Chroma)</h3>
                          <span className={`text-[8px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${selectedProduct.isBgRemoved ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-500 border-slate-200"}`}>
                            {selectedProduct.isBgRemoved ? "Đã tách nền" : "Chưa tách nền"}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-normal">Thuật toán tự động phát hiện và xóa sạch màu nền dựa trên các góc của hình ảnh sản phẩm.</p>

                        <div className="flex gap-2">
                          <button
                            onClick={async () => {
                              const original = selectedProduct.originalImage || selectedProduct.image;
                              try {
                                setAiStatus("remove-bg");
                                triggerNotification("Đang tách nền bằng AI...", "info");
                                let removed = original;
                                try {
                                  removed = await removeBgUsingGeminiAI(original);
                                } catch (err) {
                                  console.warn("AI background removal failed, falling back to chroma keying...", err);
                                  removed = await removeImageBackground(original, 35);
                                }
                                setProducts(prev => prev.map(p => {
                                  if (p.id === selectedProduct.id) {
                                    return { ...p, image: removed, originalImage: original, isBgRemoved: true };
                                  }
                                  return p;
                                }));
                                triggerNotification("Tách nền thành công!", "success");
                              } catch (err) {
                                console.error("Manual BG removal error:", err);
                                triggerNotification("Lỗi khi tách nền ảnh.", "error");
                              } finally {
                                setAiStatus(null);
                              }
                            }}
                            className="flex-1 py-1.5 bg-[#0D5235] hover:bg-[#0D5235]/90 text-white text-[10px] font-bold rounded-lg transition-all shadow-sm flex items-center justify-center gap-1"
                          >
                            <span>Xóa nền tự động</span>
                          </button>

                          {(selectedProduct.originalImage || selectedProduct.isBgRemoved) && (
                            <button
                              onClick={() => {
                                if (selectedProduct.originalImage) {
                                  setProducts(prev => prev.map(p => {
                                    if (p.id === selectedProduct.id) {
                                      return { ...p, image: selectedProduct.originalImage!, isBgRemoved: false };
                                    }
                                    return p;
                                  }));
                                  triggerNotification("Đã khôi phục nền gốc của ảnh!", "info");
                                }
                              }}
                              className="py-1.5 px-3 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-[10px] font-bold rounded-lg border border-slate-200 hover:border-slate-300 transition-all flex items-center justify-center gap-1"
                            >
                              <span>Khôi phục nền</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Brightness, Contrast, Saturation sliders */}
                    <div className="space-y-4 bg-slate-50/50 p-4 rounded-xl border border-slate-200">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Thông số điều chỉnh ảnh</h3>

                      {/* Brightness */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-500">Độ sáng (Brightness)</span>
                          <span className="text-[#0D5235] font-mono">{selectedProduct.brightness}%</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="160"
                          value={selectedProduct.brightness}
                          onChange={(e) => updateProductField(selectedProduct.id, "brightness", parseInt(e.target.value))}
                          className="w-full accent-[#0D5235]"
                        />
                      </div>

                      {/* Contrast */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-500">Độ tương phản (Contrast)</span>
                          <span className="text-[#0D5235] font-mono">{selectedProduct.contrast}%</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="160"
                          value={selectedProduct.contrast}
                          onChange={(e) => updateProductField(selectedProduct.id, "contrast", parseInt(e.target.value))}
                          className="w-full accent-[#0D5235]"
                        />
                      </div>

                      {/* Saturation */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-500">Độ bão hòa (Saturation)</span>
                          <span className="text-[#0D5235] font-mono">{selectedProduct.saturate}%</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="160"
                          value={selectedProduct.saturate}
                          onChange={(e) => updateProductField(selectedProduct.id, "saturate", parseInt(e.target.value))}
                          className="w-full accent-[#0D5235]"
                        />
                      </div>

                      {/* Padding */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-500">Khoảng lề ảnh (Padding)</span>
                          <span className="text-[#0D5235] font-mono">{selectedProduct.padding}px</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="30"
                          value={selectedProduct.padding}
                          onChange={(e) => updateProductField(selectedProduct.id, "padding", parseInt(e.target.value))}
                          className="w-full accent-[#0D5235]"
                        />
                      </div>

                      {/* Scale / Image Size */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-500">Kích thước ảnh (Scale)</span>
                          <span className="text-[#0D5235] font-mono">{((selectedProduct.scale || 100) / 100).toFixed(1)}x</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="300"
                          step="10"
                          value={selectedProduct.scale || 100}
                          onChange={(e) => updateProductField(selectedProduct.id, "scale", parseInt(e.target.value))}
                          className="w-full accent-[#0D5235]"
                        />
                      </div>

                      {/* Rotation control */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-1">
                        <span className="text-xs font-semibold text-slate-500">Xoay hình ảnh</span>
                        <div className="flex gap-1.5">
                          {[0, 90, 180, 270].map(deg => (
                            <button
                              key={deg}
                              onClick={() => updateProductField(selectedProduct.id, "rotation", deg)}
                              className={`px-2 py-1 font-mono text-[10px] rounded transition-all ${selectedProduct.rotation === deg ? "bg-slate-900 text-white font-bold" : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900"}`}
                            >
                              {deg}°
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Background Sync Options */}
                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-200">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Đồng bộ màu nền (Background Match)</h3>
                      <p className="text-[11px] text-slate-500">Căn chuẩn màu nền của khung sản phẩm để hiển thị đồng nhất đẹp mắt trong báo giá:</p>

                      <div className="grid grid-cols-4 gap-2 pt-1">
                        {[
                          { color: "#ffffff", label: "Trắng" },
                          { color: "#f8fafc", label: "Bạc" },
                          { color: "#f0f9ff", label: "Ice Blue" },
                          { color: "#f0fdf4", label: "Mint" },
                          { color: "#fffbeb", label: "Cát" },
                          { color: "#faf5ff", label: "Tím nhạt" },
                          { color: "#1e293b", label: "Slate" },
                          { color: "transparent", label: "Trong suốt" }
                        ].map((c, idx) => (
                          <button
                            key={idx}
                            onClick={() => updateProductField(selectedProduct.id, "bgColor", c.color)}
                            className={`p-1.5 rounded-lg border text-center transition-all flex flex-col items-center justify-center gap-1
                              ${selectedProduct.bgColor === c.color ? "border-[#0D5235] bg-[#0D5235]/10/50" : "border-slate-200 hover:border-slate-300 bg-white"}`}
                          >
                            <span
                              className="w-5 h-5 rounded border border-slate-200 shadow-inner block"
                              style={{ backgroundColor: c.color }}
                            ></span>
                            <span className="text-[9px] text-slate-600 truncate w-full">{c.label}</span>
                          </button>
                        ))}
                      </div>

                      {/* Apply to all button */}
                      <button
                        onClick={() => {
                          const targetColor = selectedProduct.bgColor;
                          const targetPadding = selectedProduct.padding;
                          setProducts(prev => prev.map(p => ({ ...p, bgColor: targetColor, padding: targetPadding })));
                          triggerNotification(`Đã áp dụng màu nền ${targetColor} cho tất cả dòng sản phẩm!`, "success");
                        }}
                        className="w-full mt-2 py-2 bg-slate-100 hover:bg-slate-200 text-[#0D5235] hover:text-[#0D5235] font-bold rounded text-xs border border-slate-200 flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Layers className="w-3.5 h-3.5 text-[#0D5235]" />
                        Áp dụng màu nền này cho TẤT CẢ sản phẩm
                      </button>
                    </div>

                  </div>
                )}
              </div>
            )}



          </div>

          {/* RESET HUB */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
            <span>Serverless Local Database: OK</span>
            <button
              onClick={() => {
                if (confirm("Bạn có chắc chắn muốn khôi phục toàn bộ cài đặt gốc? Tất cả sản phẩm sẽ bị ghi đè.")) {
                  localStorage.clear();
                  setProducts(sampleProducts);
                  setSelectedProductId(sampleProducts[0].id);
                  setGeneralInfo({
                    title: "BIỂU GIÁ KHUYẾN MÃI VÀ ƯU ĐÃI SẢN PHẨM",
                    subtitle: "(Áp dụng từ ngày 14/07/2026)",
                    recipient: "Quý Khách Hàng / Quý Đại Lý",
                    date: "14/07/2026",
                    companyName: "CÔNG TY TNHH TẬP ĐOÀN GAMA",
                    companySlogan: "CUNG CẤP THIẾT BỊ VỆ SINH, SƠN NƯỚC VÀ GẠCH MEN",
                    address: "VPKD: 54/6E Ấp Tiền Lân, Xã Bà Điểm, Huyện Hóc Môn, TP.HCM",
                    hotline: "Hotline: 0902 949 946 - 0934 077 239",
                    website: "Website: gama.vn",
                    saleRepName: "Nguyễn Văn Nam",
                    saleRepPhone: "0902.949.946",
                    generalPolicy: [
                      "Dưới 10 BỘ: Chiết khấu 10%",
                      "Từ 10 BỘ: Chiết khấu 15%",
                      "Từ 20 BỘ: Chiết khấu 18%"
                    ],
                    brandAccent: "GAMA",
                    representativeCode: generateUniqueQuoteCode()
                  });
                  triggerNotification("Đã thiết lập lại trạng thái ban đầu của hệ thống!", "info");
                }
              }}
              className="text-slate-400 hover:text-rose-400 transition-all text-[10px]"
            >
              Reset dữ liệu gốc
            </button>
          </div>
        </section>

        {/* RIGHT WORKSPACE: DYNAMIC LIVE A4 CANVAS PREVIEW */}
        <section className="lg:col-span-7 bg-slate-100 flex flex-col items-center justify-start lg:h-[calc(100vh-73px)] overflow-auto p-4 sm:p-6 md:p-8 relative">

          {/* QUICK TOOLBAR: TEMPLATE CHANGER & ACTION EXPORTERS */}
          <div className="w-full max-w-4xl bg-white p-3 rounded-2xl mb-5 flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-200 shadow-md sticky top-0 z-10 backdrop-blur">
            {/* Template Selector */}
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-full md:w-auto">
              {[
                { key: "enterprise", label: "Mẫu Doanh Nghiệp" },
                { key: "bento", label: "Mẫu Bento" },
                { key: "poster", label: "Mẫu Thẻ Đơn" }
              ].map(t => (
                <button
                  key={t.key}
                  onClick={() => setTemplate(t.key as any)}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${template === t.key ? "text-white shadow" : "text-slate-600 hover:text-slate-900"}`}
                  style={{ backgroundColor: template === t.key ? "#0D5235" : undefined }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Export Actions */}
            <div className="flex items-center justify-end gap-2 w-full md:w-auto shrink-0">
              <button
                onClick={exportAsImage}
                disabled={isExporting}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 hover:border-slate-300 transition-all disabled:opacity-50 shadow-sm"
              >
                <Download className="w-4 h-4 text-[#0D5235]" />
                <span>Xuất ảnh</span>
              </button>

              <button
                onClick={exportAsPdf}
                disabled={isExporting}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0D5235] hover:bg-[#0D5235]/90 text-white text-xs font-bold rounded-xl shadow-sm transition-all disabled:opacity-50"
              >
                <FileDown className="w-4 h-4 stroke-[2.5]" />
                <span>Xuất PDF</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-bold rounded-xl border border-slate-200 transition-all hidden sm:flex shadow-sm"
                title="In trực tiếp bằng trình duyệt"
              >
                <Printer className="w-4 h-4" />
                <span>In</span>
              </button>
            </div>
          </div>

          {/* DYNAMIC SCALING WRAPPER FOR CHOSEN TEMPLATE */}
          <div
            className="w-full flex justify-center items-start origin-top transition-all"
            style={{ transform: `scale(${zoom / 100})`, marginBottom: `${(zoom - 100) * 8}px` }}
          >

            {/* THE LIVE CANVAS ELEMENT TO CAPTURE */}
            <div
              id="quotation-preview"
              ref={previewRef}
              className="bg-white text-slate-800 p-8 shadow-2xl relative border border-slate-200 overflow-hidden print:shadow-none print:border-none shrink-0"
              style={{
                width: "210mm", // Standard A4 Width
                minWidth: "210mm", // Lock A4 dimensions
                maxWidth: "210mm",
                minHeight: "297mm", // Standard A4 Height
                fontFamily: "var(--font-sans), sans-serif",
                color: "#1e293b"
              }}
            >
              {/* Force clean RGB background and border colors for html2canvas rendering */}
              <style>{`
                #quotation-preview .border-slate-100 {
                  border-color: #f1f5f9 !important;
                }
                #quotation-preview .border-slate-200 {
                  border-color: #e2e8f0 !important;
                }
                #quotation-preview .bg-slate-50 {
                  background-color: #f8fafc !important;
                }
                #quotation-preview td, #quotation-preview th {
                  border-color: #e2e8f0 !important;
                }
              `}</style>

              {/* =========================================================
                  TEMPLATE 1: ENTERPRISE STANDARD SHEET (MODERN EXCEL REMAKE)
                  ========================================================= */}
              {template === "enterprise" && (
                <div className="space-y-6 flex flex-col justify-between h-full min-h-[275mm]">

                  {/* BRAND HEADER BANNER */}
                  <div className="flex items-start justify-between border-b-2 border-slate-200 pb-5">
                    {/* Brand Left Info Block */}
                    <div className="flex items-center gap-4">
                      {/* Logo Frame */}
                      <div className="p-2.5 rounded-2xl border flex items-center justify-center shadow-sm" style={{ backgroundColor: "#f8fafc", borderColor: "#e2e8f0" }}>
                        <GamaInterlockLogo size={58} />
                      </div>

                      <div className="space-y-1">
                        <h2 className="text-xl font-bold tracking-tight font-display uppercase" style={{ color: "#0D5235" }}>
                          {generalInfo.companyName}
                        </h2>
                        <div className="text-[10px] text-slate-600 space-y-0.5 mt-1 font-medium">
                          <p>{generalInfo.address}</p>
                          <p>{generalInfo.hotline}</p>
                          <p className="text-slate-500">{generalInfo.website}</p>
                        </div>
                      </div>
                    </div>

                    {/* Meta Info Block Right */}
                    <div className="text-right space-y-1 p-3 rounded-xl border min-w-[140px]" style={{ backgroundColor: "#f8fafc", borderColor: "#f1f5f9" }}>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Ngày báo giá</p>
                      <p className="text-xs font-bold text-slate-800">{generalInfo.date}</p>
                      <div className="pt-2 mt-2 border-t border-slate-200/80">
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Mã đại diện</p>
                        <p className="text-[10px] font-bold font-mono" style={{ color: colors.primary }}>
                          {generalInfo.representativeCode || "GAMA-RE-2026"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* DOCUMENT MAIN HEADING */}
                  <div className="text-center space-y-1.5 my-3">
                    <h3 className="text-xl font-black tracking-tight text-slate-950 font-display uppercase" style={{ color: colors.primary }}>
                      {generalInfo.title}
                    </h3>
                    <p className="text-xs font-bold text-slate-600 italic tracking-wide">
                      {generalInfo.subtitle}
                    </p>
                    <div className="w-16 h-1 mx-auto rounded-full mt-2" style={{ backgroundColor: colors.secondary }}></div>
                  </div>

                  {/* CUSTOMER RECIPIENT BLOCK */}
                  <div className="flex justify-between items-start gap-4 p-4 rounded-xl border" style={{ backgroundColor: "#f8fafc", borderColor: "#f1f5f9" }}>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Kính gửi đối tác</span>
                      <p className="text-sm font-bold text-slate-900">{generalInfo.recipient}</p>
                      <p className="text-[11px] text-slate-500 mt-1">Trân trọng gửi đến quý đối tác bảng giá công bố mới nhất từ tập đoàn.</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Đại diện kinh doanh</span>
                      <p className="text-sm font-bold text-slate-900 flex items-center justify-end gap-1">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        {generalInfo.saleRepName}
                      </p>
                      <p className="text-xs font-semibold text-slate-700 font-mono flex items-center justify-end gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-500" />
                        {generalInfo.saleRepPhone}
                      </p>
                    </div>
                  </div>

                  {/* MAIN PRODUCTS TABLE LIST */}
                  <div className="flex-1 mt-2">
                    <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider" style={{ backgroundColor: colors.primary }}>
                            <th className="py-3 px-3 text-center w-[12%]">ẢNH</th>
                            <th className="py-3 px-3 w-[18%]">MÃ HÀNG</th>
                            <th className="py-3 px-4 w-[38%]">TÊN SẢN PHẨM</th>
                            <th className="py-3 px-2 text-center w-[10%]">HỆ</th>
                            <th className="py-3 px-2 text-center w-[8%]">ĐVT</th>
                            <th className="py-3 px-4 text-right w-[14%]">GIÁ BÁN LẺ</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-xs">
                          {products.map((p, index) => (
                            <tr key={p.id} className="hover:bg-slate-100/40 transition-colors" style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8fafc" }}>

                              {/* Product Photo Box with color blend background */}
                              <td className="py-2.5 px-2 text-center">
                                <div
                                  className="w-14 h-14 rounded-lg mx-auto flex items-center justify-center border border-slate-200 shadow-sm relative overflow-hidden"
                                  style={{ backgroundColor: p.bgColor || "#ffffff" }}
                                >
                                  <img
                                    src={p.image}
                                    alt=""
                                    crossOrigin="anonymous"
                                    className="max-w-[85%] max-h-[85%] object-contain"
                                    style={{
                                      filter: `brightness(${p.brightness}%) contrast(${p.contrast}%) saturate(${p.saturate}%)`,
                                      transform: `rotate(${p.rotation}deg) scale(${(p.scale || 100) / 100})`,
                                      padding: `${p.padding / 2}px`
                                    }}
                                  />
                                </div>
                              </td>

                              {/* Product Code */}
                              <td className="py-3 px-3 font-mono font-bold text-slate-900">
                                <span className={`${isExporting ? "block" : "hidden"} print:block py-0.5`}>{p.productCode}</span>
                                {!isExporting && (
                                  <input
                                    type="text"
                                    value={p.productCode}
                                    onChange={(e) => handleInlineEditProduct(p.id, "productCode", e.target.value)}
                                    className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-slate-400 focus:outline-none py-0.5 print:hidden"
                                  />
                                )}
                              </td>

                              {/* Product Name */}
                              <td className="py-3 px-4 text-slate-800 font-semibold leading-relaxed">
                                <span className={`${isExporting ? "block" : "hidden"} print:block py-0.5 font-medium`}>{p.productName}</span>
                                {!isExporting && (
                                  <input
                                    type="text"
                                    value={p.productName}
                                    onChange={(e) => handleInlineEditProduct(p.id, "productName", e.target.value)}
                                    className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-slate-400 focus:outline-none py-0.5 font-medium print:hidden"
                                  />
                                )}
                                <span className={`${isExporting ? "block" : "hidden"} print:block text-[10px] text-slate-400 font-normal mt-0.5`}>
                                  {p.description || ""}
                                </span>
                                {!isExporting && (
                                  <input
                                    type="text"
                                    value={p.description || ""}
                                    onChange={(e) => handleInlineEditProduct(p.id, "description", e.target.value)}
                                    placeholder="Thêm mô tả..."
                                    className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-slate-400 focus:outline-none text-[10px] text-slate-400 font-normal mt-0.5 print:hidden"
                                  />
                                )}
                              </td>

                              {/* Brand Label Accent */}
                              <td className="py-3 px-2 text-center">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block
                                  ${p.brand === "GAMA" ? "bg-[#0D5235]/15 text-[#0D5235]" : ""}
                                  ${p.brand === "Lendo" ? "bg-sky-100 text-sky-800" : ""}
                                  ${p.brand === "Ares" ? "bg-pink-100 text-pink-800" : ""}`}>
                                  {p.brand}
                                </span>
                              </td>

                              {/* Unit */}
                              <td className="py-3 px-2 text-center text-slate-600 font-medium">
                                <span className={`${isExporting ? "block" : "hidden"} print:block text-center`}>{p.unit}</span>
                                {!isExporting && (
                                  <input
                                    type="text"
                                    value={p.unit}
                                    onChange={(e) => handleInlineEditProduct(p.id, "unit", e.target.value)}
                                    className="w-10 bg-transparent border-b border-transparent hover:border-slate-300 text-center focus:outline-none print:hidden"
                                  />
                                )}
                              </td>

                              {/* Pricing with Red Styling */}
                              <td className="py-3 px-4 text-right font-bold text-rose-600 text-sm">
                                <div className="flex items-center justify-end">
                                  <span className={`${isExporting ? "block" : "hidden"} print:block font-bold text-rose-600`}>{p.price.toLocaleString("vi-VN")}</span>
                                  {!isExporting && (
                                    <input
                                      type="text"
                                      value={p.price.toLocaleString("vi-VN")}
                                      onChange={(e) => handleInlineEditProduct(p.id, "price", e.target.value)}
                                      className="w-20 bg-transparent border-b border-transparent hover:border-slate-300 text-right font-bold text-rose-600 focus:outline-none print:hidden"
                                    />
                                  )}
                                  <span className="ml-0.5 text-xs">đ</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* BOTTOM POLICY & STAMP FOOTER */}
                  <div className="grid grid-cols-12 gap-6 pt-5 border-t border-slate-200 items-end">

                    {/* General Company Note */}
                    <div className="col-span-6 space-y-1.5 text-[10px] text-slate-500">
                      <p className="font-bold text-slate-800 text-xs">CHÍNH SÁCH BÁN HÀNG & PHÂN PHỐI</p>
                      <p>• Bảng giá trên là giá bán lẻ chính thức đã bao gồm VAT.</p>
                      <p>• Có chính sách hỗ trợ vận chuyển cho các đại lý.</p>
                      <p>• Chính sách bảo hành phụ thuộc đặc tính vật liệu và đặc thù sản phẩm.</p>
                    </div>

                    {/* Sales Discount Policy Tiers */}
                    <div className="col-span-6 bg-rose-50 border border-rose-100 rounded-xl p-4 text-right space-y-1 ml-auto w-full max-w-[320px]">
                      <h4 className="text-xs font-black text-rose-950 uppercase tracking-wider mb-2">Định Mức Chiết Khấu Đại Lý</h4>
                      <div className="space-y-1 text-xs font-bold text-rose-600">
                        {generalInfo.generalPolicy.map((pol, idx) => {
                          const hasColon = pol.includes(":");
                          const part1 = hasColon ? pol.substring(0, pol.indexOf(":")).trim() : pol.trim();
                          const part2 = hasColon ? pol.substring(pol.indexOf(":") + 1).trim() : "";
                          return (
                            <p key={idx} className="flex justify-between gap-4 border-b border-rose-200/50 pb-1 last:border-none">
                              <span className={hasColon ? "text-rose-900/60 font-normal text-left" : "text-rose-900 font-bold text-center w-full"}>
                                {part1}
                              </span>
                              {hasColon && <span>{part2}</span>}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Enterprise Stamp / Signature Placeholder */}
                  <div className="flex justify-between items-center text-[10px] text-slate-400 pt-3 border-t border-slate-100 mt-2">
                    <p>Bản báo giá điện tử lưu hành nội bộ - Đơn vị: VNĐ</p>
                    <p className="font-bold text-slate-500 uppercase tracking-widest">{generalInfo.companyName}</p>
                  </div>

                </div>
              )}

              {/* =========================================================
                  TEMPLATE 2: MODERN BENTO CARD LAYOUT (VISUAL CATALOGUE)
                  ========================================================= */}
              {template === "bento" && (
                <div className="space-y-6 flex flex-col justify-between h-full min-h-[275mm]">

                  {/* Redesigned Premium Bento Header Card */}
                  <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm mb-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Decorative color accents */}
                    <div className="absolute top-0 left-0 w-full h-[4px]" style={{ backgroundColor: colors.primary }}></div>
                    <div className="absolute top-[4px] left-0 w-full h-[2px]" style={{ backgroundColor: colors.secondary }}></div>

                    {/* Left: Brand logo frame & company detail */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                      <div className="p-2.5 rounded-2xl border flex items-center justify-center shrink-0" style={{ backgroundColor: "#f8fafc", borderColor: "#e2e8f0" }}>
                        <GamaInterlockLogo size={54} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xl font-black tracking-wider uppercase" style={{ color: "#0D5235" }}>
                          {generalInfo.companyName}
                        </p>
                        <h2 className="text-lg font-black font-display tracking-tight leading-tight uppercase max-w-md" style={{ color: colors.primary }}>
                          {generalInfo.title}
                        </h2>
                      </div>
                    </div>

                    {/* Right: Date, rep & meta info badge */}
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-100 w-full sm:w-auto sm:pl-6 text-slate-500 font-mono text-[10px]">
                      <div className="space-y-0.5 text-left sm:text-right">
                        <p className="text-slate-400 uppercase text-[8px] font-bold font-sans tracking-widest">Ngày phát hành</p>
                        <p className="font-bold text-slate-800 text-[11px]">{generalInfo.date}</p>
                      </div>
                      <div className="space-y-0.5 text-right hidden sm:block mt-1">
                        <p className="text-slate-400 uppercase text-[8px] font-bold font-sans tracking-widest">Đại diện bán hàng</p>
                        <p className="font-bold text-slate-700">{generalInfo.saleRepName}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bento Grid layout */}
                  <div className="grid grid-cols-3 gap-4 flex-1 my-4">
                    {products.slice(0, 9).map((p) => (
                      <div
                        key={p.id}
                        className="border border-slate-200 rounded-2xl p-4.5 flex flex-col justify-between transition-all hover:shadow-lg relative bg-white"
                      >
                        {/* Photo Container */}
                        <div
                          className="w-full aspect-square rounded-xl flex items-center justify-center relative overflow-hidden mb-3.5"
                          style={{ backgroundColor: p.bgColor || "#f8fafc" }}
                        >
                          <img
                            src={p.image}
                            alt=""
                            crossOrigin="anonymous"
                            className="max-w-[80%] max-h-[80%] object-contain"
                            style={{
                              filter: `brightness(${p.brightness}%) contrast(${p.contrast}%) saturate(${p.saturate}%)`,
                              transform: `rotate(${p.rotation}deg) scale(${(p.scale || 100) / 100})`,
                              padding: `${p.padding / 2}px`
                            }}
                          />
                          <span className="absolute top-2 left-2 text-[8px] bg-slate-900/10 font-bold px-2 py-0.5 rounded font-mono text-slate-700">
                            {p.productCode}
                          </span>
                        </div>

                        {/* Title and pricing */}
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{p.brand}</p>

                          {/* Product Name */}
                          <span className={`${isExporting ? "block" : "hidden"} print:block text-xs font-bold text-slate-800 line-clamp-2 min-h-[32px] leading-snug`}>
                            {p.productName}
                          </span>
                          {!isExporting && (
                            <textarea
                              value={p.productName}
                              onChange={(e) => handleInlineEditProduct(p.id, "productName", e.target.value)}
                              rows={2}
                              className="w-full bg-transparent border border-transparent hover:border-slate-200 focus:border-slate-300 focus:outline-none text-xs font-bold text-slate-800 leading-snug resize-none print:hidden rounded px-1 min-h-[32px]"
                            />
                          )}

                          {/* Product Description */}
                          <span className={`${isExporting ? "block" : "hidden"} print:block text-[9px] text-slate-400 line-clamp-1`}>
                            {p.description || ""}
                          </span>
                          {!isExporting && (
                            <input
                              type="text"
                              value={p.description || ""}
                              onChange={(e) => handleInlineEditProduct(p.id, "description", e.target.value)}
                              placeholder="Thêm mô tả..."
                              className="w-full bg-transparent border border-transparent hover:border-slate-200 focus:border-slate-300 focus:outline-none text-[9px] text-slate-400 print:hidden rounded px-1"
                            />
                          )}

                          <div className="flex items-baseline justify-between pt-1 border-t border-slate-100 mt-2">
                            <span className="text-[9px] font-bold text-slate-400 uppercase">Giá KM</span>
                            <div className="flex items-baseline justify-end">
                              <span className={`${isExporting ? "block" : "hidden"} print:block text-sm font-black text-rose-600 font-mono`}>
                                {p.price.toLocaleString("vi-VN")}đ
                              </span>
                              {!isExporting && (
                                <div className="flex items-center text-sm font-black text-rose-600 font-mono print:hidden">
                                  <input
                                    type="text"
                                    value={p.price.toLocaleString("vi-VN")}
                                    onChange={(e) => handleInlineEditProduct(p.id, "price", e.target.value)}
                                    className="w-20 bg-transparent border border-transparent hover:border-slate-200 hover:bg-slate-50 text-right focus:outline-none rounded px-1 font-bold font-mono"
                                  />
                                  <span>đ</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bento Contact Box */}
                  <div className="bg-slate-900 text-white rounded-2xl p-5 grid grid-cols-12 gap-4 items-center" style={{ backgroundColor: colors.primary }}>
                    <div className="col-span-8 space-y-1">
                      <p className="text-xs font-bold text-[#B8954F] tracking-wider">LIÊN HỆ MUA HÀNG</p>
                      <h4 className="text-base font-bold">{generalInfo.recipient}</h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed">Liên hệ trực tiếp đại diện kinh doanh của GAMA để nhận được mức ưu đãi tốt nhất.</p>
                    </div>

                    <div className="col-span-4 text-right space-y-1 border-l border-slate-700 pl-5">
                      <p className="text-xs text-slate-400">Đại diện kinh doanh</p>
                      <p className="text-sm font-bold text-white">{generalInfo.saleRepName}</p>
                      <p className="text-sm font-bold font-mono text-[#B8954F]">{generalInfo.saleRepPhone}</p>
                    </div>
                  </div>

                </div>
              )}

              {/* =========================================================
                  TEMPLATE 3: SINGLE PREMIUM PRODUCT DETAIL CARD
                  ========================================================= */}
              {template === "poster" && (
                <div className="h-full min-h-[275mm] flex flex-col justify-between">

                  {/* Top luxury header */}
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2">
                      <GamaInterlockLogo size={42} />
                      <div>
                        <h3 className="text-xl font-black tracking-wider uppercase" style={{ color: "#0D5235" }}>{generalInfo.companyName}</h3>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold px-2.5 py-1 rounded font-mono uppercase tracking-wider" style={{ backgroundColor: hexToRgba(colors.primary, 0.15), color: colors.primary }}>
                      Premium Catalog
                    </span>
                  </div>

                  {/* Large Hero product selection */}
                  {selectedProduct ? (
                    <div className="my-auto py-10 space-y-8 flex-1 flex flex-col justify-center">

                      {/* Product Image Frame */}
                      <div
                        className="w-full max-w-[340px] aspect-square rounded-3xl mx-auto flex items-center justify-center shadow-xl relative overflow-hidden border border-slate-100/50"
                        style={{ backgroundColor: selectedProduct.bgColor || "#f8fafc" }}
                      >
                        <img
                          src={selectedProduct.image}
                          alt=""
                          crossOrigin="anonymous"
                          className="max-w-[85%] max-h-[85%] object-contain"
                          style={{
                            filter: `brightness(${selectedProduct.brightness}%) contrast(${selectedProduct.contrast}%) saturate(${selectedProduct.saturate}%)`,
                            transform: `rotate(${selectedProduct.rotation}deg) scale(${(selectedProduct.scale || 100) / 100})`,
                            padding: `${selectedProduct.padding}px`
                          }}
                        />
                      </div>

                      {/* Info layout */}
                      <div className="text-center space-y-4 max-w-xl mx-auto flex flex-col items-center">
                        {/* Product Code */}
                        <span className={`${isExporting ? "inline-block" : "hidden"} print:inline-block text-xs bg-slate-900 text-white font-mono font-bold px-3 py-1 rounded-full uppercase tracking-widest`}>
                          {selectedProduct.productCode}
                        </span>
                        {!isExporting && (
                          <input
                            type="text"
                            value={selectedProduct.productCode}
                            onChange={(e) => handleInlineEditProduct(selectedProduct.id, "productCode", e.target.value)}
                            className="bg-slate-900 text-white font-mono font-bold px-3 py-1 rounded-full uppercase tracking-widest text-center text-xs focus:outline-none w-32 border border-slate-700 mx-auto print:hidden"
                          />
                        )}

                        {/* Product Name */}
                        <h2 className={`${isExporting ? "block" : "hidden"} print:block text-2xl font-black font-display tracking-tight leading-snug`} style={{ color: colors.primary }}>
                          {selectedProduct.productName}
                        </h2>
                        {!isExporting && (
                          <textarea
                            value={selectedProduct.productName}
                            onChange={(e) => handleInlineEditProduct(selectedProduct.id, "productName", e.target.value)}
                            rows={2}
                            style={{ color: colors.primary }}
                            className="w-full max-w-lg mx-auto bg-transparent border border-transparent hover:border-slate-200 focus:border-slate-300 focus:outline-none text-2xl font-black font-display tracking-tight text-center leading-snug resize-none rounded px-2 print:hidden min-h-[64px]"
                          />
                        )}

                        {/* Product Description */}
                        <p className={`${isExporting ? "block" : "hidden"} print:block text-xs text-slate-500 max-w-md mx-auto leading-relaxed italic`}>
                          &quot;{selectedProduct.description || ""}&quot;
                        </p>
                        {!isExporting && (
                          <textarea
                            value={selectedProduct.description || ""}
                            onChange={(e) => handleInlineEditProduct(selectedProduct.id, "description", e.target.value)}
                            placeholder="Nhập mô tả sản phẩm tại đây..."
                            rows={3}
                            className="w-full max-w-md mx-auto bg-transparent border border-transparent hover:border-slate-200 focus:border-slate-300 focus:outline-none text-xs text-slate-500 text-center leading-relaxed italic resize-none rounded px-2 print:hidden min-h-[60px]"
                          />
                        )}

                        <div className="w-16 h-1 bg-slate-200 mx-auto rounded-full"></div>

                        {/* Large pricing tag */}
                        <div className="space-y-1 w-full">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Giá bán lẻ đề xuất</p>
                          <div className="flex items-center justify-center gap-1">
                            <span className={`${isExporting ? "block" : "hidden"} print:block text-3xl font-black text-rose-600 font-mono tracking-tight`}>
                              {selectedProduct.price.toLocaleString("vi-VN")} đ <span className="text-base text-slate-500 font-normal">/ {selectedProduct.unit}</span>
                            </span>
                            {!isExporting && (
                              <div className="flex items-center justify-center text-3xl font-black text-rose-600 font-mono print:hidden">
                                <input
                                  type="text"
                                  value={selectedProduct.price.toLocaleString("vi-VN")}
                                  onChange={(e) => handleInlineEditProduct(selectedProduct.id, "price", e.target.value)}
                                  className="w-40 bg-transparent border border-transparent hover:border-slate-200 text-right focus:outline-none rounded px-1 font-bold font-mono text-3xl text-rose-600"
                                />
                                <span className="ml-1 text-2xl">đ</span>
                                <span className="text-slate-400 font-normal text-xl mx-2">/</span>
                                <input
                                  type="text"
                                  value={selectedProduct.unit}
                                  onChange={(e) => handleInlineEditProduct(selectedProduct.id, "unit", e.target.value)}
                                  className="w-16 bg-transparent border border-transparent hover:border-slate-200 text-left focus:outline-none rounded px-1 font-normal text-base text-slate-500"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="text-center py-20 text-slate-400 text-sm">
                      Chưa chọn sản phẩm nào để hiển thị thẻ đơn lẻ.
                    </div>
                  )}

                  {/* Luxury bottom signature */}
                  <div className="p-5 rounded-2xl border grid grid-cols-2 gap-4 items-center" style={{ backgroundColor: "#f8fafc", borderColor: "#f1f5f9" }}>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Liên hệ mua hàng</p>
                      <p className="text-sm font-black text-slate-800">{generalInfo.saleRepName}</p>
                      <p className="text-xs font-bold font-mono" style={{ color: colors.primary }}>{generalInfo.saleRepPhone}</p>
                    </div>

                    <div className="text-right space-y-0.5 text-[9px] text-slate-500 font-medium">
                      <p className="font-bold text-slate-700">CHÍNH SÁCH ƯU ĐÃI</p>
                      <p>Ưu đãi được cập nhật bởi đại diện kinh doanh của GAMA.</p>
                      <p>Sản phẩm phân phối bởi GAMA Group</p>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>

          {/* Interactive Zoom Overlay */}
          <div className="w-full max-w-4xl mt-3 flex justify-between items-center text-xs text-slate-600 px-2">
            <span>Mẹo: Bạn có thể click trực tiếp vào văn bản trong bảng xem trước để gõ chỉnh sửa nhanh!</span>
            <div className="flex gap-2 text-[10px]">
              <span className="flex items-center gap-1 font-semibold text-[#0D5235]">
                <Check className="w-3 h-3" />
                CORS Secure
              </span>
              <span className="flex items-center gap-1 font-semibold text-sky-700">
                <Check className="w-3 h-3" />
                High-Res Scale
              </span>
            </div>
          </div>

        </section>

      </main>

      {/* FOOTER BAR */}
      <footer className="bg-white text-slate-500 text-center py-4 border-t border-slate-200 text-[11px] font-medium">
        <p>© 2026 GAMA Group. Ứng dụng tạo và quản lý báo giá chuyên dụng. Hỗ trợ chạy offline local, Vercel & Cloudflare.</p>
      </footer>

      {/* AI Processing Modal Overlay */}
      <AIProcessingLoader status={aiStatus} />

      {/* Safari/Mobile Image Save Helper Modal */}
      {exportedImageUrl && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full text-center shadow-2xl border border-slate-100 flex flex-col items-center space-y-4 animate-fadeIn">
            <div className="bg-emerald-50 p-3 rounded-full text-emerald-600 flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-900">Báo giá của bạn đã sẵn sàng!</h3>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                Trên Safari và điện thoại di động: Hãy <strong>chạm và giữ (hoặc đè tay) vào hình ảnh dưới đây</strong>, sau đó chọn <strong>"Thêm vào Ảnh" (Save to Photos)</strong> hoặc <strong>"Lưu hình ảnh"</strong> để tải về thư viện điện thoại.
              </p>
            </div>

            <div className="w-full bg-slate-100 rounded-xl border border-slate-200 overflow-y-auto p-1.5 shadow-inner" style={{ maxHeight: "40vh" }}>
              <img
                src={exportedImageUrl}
                alt="Generated Quote"
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </div>

            <div className="flex gap-2 w-full pt-1">
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.download = `BAO_GIA_GAMA_${generalInfo.date.replace(/\//g, "-")}.png`;
                  link.href = exportedImageUrl;
                  link.click();
                }}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition-all border border-slate-200"
              >
                Thử Tải Về Trực Tiếp
              </button>

              <button
                onClick={() => setExportedImageUrl(null)}
                className="flex-1 py-2 bg-[#0D5235] hover:bg-[#0D5235]/90 text-white font-bold rounded-lg text-xs transition-all shadow-md"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const QuotationGenerator = dynamic(() => Promise.resolve(PageContent), { ssr: false });

export default function Page() {
  return <QuotationGenerator />;
}
