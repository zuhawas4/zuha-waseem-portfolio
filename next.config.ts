import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Turbopack rooted at this project (sibling shop-co has its own lockfile)
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
