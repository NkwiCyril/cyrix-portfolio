import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { adminClient } from "@/utils/supabase/admin";

export async function POST() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Check if user is admin (use service-role client to avoid RLS issues)
    const { data: userData, error: profileError } = await adminClient
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError) {
      // If the profile doesn't exist yet, create a default one keyed by auth user id.
      if (profileError.code === "PGRST116") {
        const { error: createProfileError } = await adminClient
          .from("profiles")
          .insert([
            {
              id: user.id,
              email: user.email ?? "",
              name: user.user_metadata?.name ?? "",
              role: "user",
            },
          ]);

        if (createProfileError) {
          return NextResponse.json(
            { error: createProfileError.message },
            { status: 500 }
          );
        }

        return NextResponse.json(
          {
            error:
              "Unauthorized: Admin access required. Your profile was created, but it is not an admin profile yet.",
          },
          { status: 403 }
        );
      } else {
        return NextResponse.json({ error: profileError.message }, { status: 500 });
      }
    }

    if (!userData || userData.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, role: userData.role });
  } catch (error) {
    console.error("Admin verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
