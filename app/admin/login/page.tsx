"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // User is already authenticated, verify admin and redirect
        const response = await fetch("/api/auth/verify-admin", {
          method: "POST",
        });
        
        if (response.ok) {
          router.push("/admin");
          return;
        }
      }
      
      setChecking(false);
    };
    
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();

      // Sign in with Supabase (client-side)
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      // Verify admin role via API
      const response = await fetch("/api/auth/verify-admin", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        await supabase.auth.signOut();
        setError(data.error || "Unauthorized: Admin access required");
        setLoading(false);
        return;
      }

      // Redirect to admin dashboard
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-puertos text-3xl font-bold text-accent">
            Cyrix Admin
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to manage your portfolio
          </p>
        </div>

        <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-3 text-white placeholder-gray-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 w-full rounded-lg border border-gray-700 bg-[#0a0a0a] px-4 py-3 text-white placeholder-gray-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="• • • • • • •"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-800 bg-red-950/20 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 font-medium text-[#0a0a0a] transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <LogIn size={20} />
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
