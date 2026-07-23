export type SupabaseConfig = {
  url: string;
  key: string;
};

export function getSupabaseConfig(
  environment: NodeJS.ProcessEnv = process.env,
): SupabaseConfig | null {
  const url = environment.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = (
    environment.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    environment.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )?.trim();

  if (!url || !key) return null;

  try {
    const parsedUrl = new URL(url);
    const isLoopback = ["localhost", "127.0.0.1", "[::1]"].includes(
      parsedUrl.hostname,
    );
    if (parsedUrl.protocol !== "https:" && !isLoopback) {
      return null;
    }
  } catch {
    return null;
  }

  return { url, key };
}
