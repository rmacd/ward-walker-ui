import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8083/api/:path*',
            },
        ];
    },
};

export default nextConfig;
