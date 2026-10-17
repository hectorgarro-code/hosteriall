import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hostinger Premium: upload the contents of out/; no server runtime is needed.
  output: 'export',
  trailingSlash: true,
  cacheComponents: false,
  images: { unoptimized: true },
};

export default nextConfig;
