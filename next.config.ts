import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    basePath: "/absent-minded",
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
        ],
    },
    devIndicators: false,
};

export default nextConfig;
