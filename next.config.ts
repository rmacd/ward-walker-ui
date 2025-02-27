/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://127.0.0.1:8083/api/:path*",
            },
        ];
    },
    output: "standalone", // Keep other options here
};

module.exports = nextConfig;
