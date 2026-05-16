import { NextRequest, NextResponse } from "next/server";
import { adminClient } from "@/utils/supabase/admin";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    const { data, error } = await adminClient
      .from("app_settings")
      .select("*")
      .eq("key", key)
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching setting:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    const body = await request.json();

    if (body.value === undefined) {
      return NextResponse.json(
        { error: "value is required" },
        { status: 400 }
      );
    }

    const { data, error } = await adminClient
      .from("app_settings")
      .upsert(
        { key, value: body.value, updated_at: new Date().toISOString() },
        { onConflict: "key" }
      )
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating setting:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
