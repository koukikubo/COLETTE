const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  compilerOptions: {
    baseUrl: "src",
    paths: {
      "@/*": ["*"],
    },
  },
};
export default nextConfig;
