import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { adminClient } from "@/utils/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    // Refresh session to ensure cookies are set
    await supabase.auth.getSession();

    // Check if user is admin (use service-role client to avoid RLS issues)
    const {
      data: userData,
      error: profileError,
    } = await adminClient.from("profiles").select("role").eq("id", data.user.id).single();

    if (profileError) {
      // If the profile doesn't exist yet, create a default one keyed by auth user id.
      if (profileError.code === "PGRST116") {
        const { error: createProfileError } = await adminClient
          .from("profiles")
          .insert([
            {
              id: data.user.id,
              email: data.user.email ?? email,
              name: data.user.user_metadata?.name ?? "",
              role: "user",
            },
          ]);

        if (createProfileError) {
          return NextResponse.json(
            { error: createProfileError.message },
            { status: 500 }
          );
        }

        // Re-fetch after creation
        const { data: createdUserData, error: createdFetchError } = await adminClient
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        if (createdFetchError) {
          return NextResponse.json(
            { error: createdFetchError.message },
            { status: 500 }
          );
        }

        if (!createdUserData || createdUserData.role !== "admin") {
          await supabase.auth.signOut();
          return NextResponse.json(
            {
              error:
                "Unauthorized: Admin access required. Your profile was created, but it is not an admin profile yet.",
            },
            { status: 403 }
          );
        }
      } else {
        return NextResponse.json({ error: profileError.message }, { status: 500 });
      }
    }

    if (!userData || userData.role !== "admin") {
      await supabase.auth.signOut();
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }

    // Return success response
    return NextResponse.json({ success: true, user: data.user });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
