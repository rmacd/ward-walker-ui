/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/v1/:path*",
                destination: "http://127.0.0.1:8083/api/v1/:path*",
            },
        ];
    },
    output: "standalone", // Keep other options here
};

module.exports = nextConfig;
