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
    // productionBrowserSourceMaps: true,
    // webpack: (config, { isServer }) => {
    //     if (isServer) {
    //         config.externals = [
    //             ...config.externals,
    //             "@espresso-lab/mantine-cognito", // Exclude from server bundle
    //         ];
    //     }
    //     return config;
    // },
};

module.exports = {
    // ... rest of the configuration.
    output: "export",
};

export default nextConfig;
