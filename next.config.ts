import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Parent folder has another lockfile (shop-co) — pin Turbopack to this app
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
