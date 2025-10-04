import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**', // 이 호스트네임의 모든 경로를 허용합니다
      },
    ],
  },
};

export default nextConfig;
