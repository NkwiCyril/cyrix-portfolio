import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { adminClient } from "@/utils/supabase/admin";

export const runtime = "nodejs";

const CONVERTIBLE_MIME = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/tiff",
]);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const bucket = (formData.get("bucket") as string) || "uploads";
    const folder = (formData.get("folder") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const inputBytes = new Uint8Array(arrayBuffer);

    let buffer: Uint8Array = inputBytes;
    let contentType = file.type;
    let fileExt = file.name.split(".").pop()?.toLowerCase() || "bin";

    if (CONVERTIBLE_MIME.has(file.type)) {
      buffer = await sharp(inputBytes)
        .webp({ quality: 85, alphaQuality: 90, effort: 5 })
        .toBuffer();
      contentType = "image/webp";
      fileExt = "webp";
    }

    const fileName = `${folder ? folder + "/" : ""}${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const { data, error } = await adminClient.storage
      .from(bucket)
      .upload(fileName, buffer, {
        contentType,
        upsert: false,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const { data: urlData } = adminClient.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return NextResponse.json({ url: urlData.publicUrl, path: data.path });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
