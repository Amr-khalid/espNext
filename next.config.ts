import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === "development", // يعمل فقط في الـ production
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://xxxx.ngrok-free.app/:path*", // رابط ngrok
      },
    ];
  },
};

export default withPWA(nextConfig);
