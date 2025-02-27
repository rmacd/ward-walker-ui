import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8083/api/:path*',
            },
        ];
    },
  /* config options here */
};

module.exports = {
    // ... rest of the configuration.
    output: "standalone",
};

export default nextConfig;
