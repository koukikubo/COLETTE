/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // コンテナ間通信はサービス名:ポート。APIバージョンが /api/v1 の場合はそれを含める
        destination: "http://backend:3001/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
