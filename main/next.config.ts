import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the dev server cache separate from production builds so `next build`
  // cannot invalidate manifests while `next dev` is running.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
};

export default nextConfig;
