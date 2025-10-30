import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cerivpn.com", // optional: if your app uses images from your domain too
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
