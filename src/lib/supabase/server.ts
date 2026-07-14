/* eslint-disable */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy-url.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-anon-key";

export async function createClient() {
  const cookieStore = await cookies();

  // MOCK: Return a mock client that resolves with a fake user session
  return {
    auth: {
      getUser: async () => {
        return {
          data: {
            user: {
              id: "mock-user-id",
              email: "founder@thrivo.app",
              user_metadata: {
                full_name: "Mock Founder",
              },
            },
          },
          error: null,
        };
      },
    },
  } as any; // Cast as any to bypass strict type checking for the mock
}
