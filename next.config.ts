import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Izinkan akses dev server dari IP jaringan lokal (mis. dibuka dari HP di jaringan yang sama).
  allowedDevOrigins: ["169.254.181.74", "localhost", "127.0.0.1"],
};

export default nextConfig;
