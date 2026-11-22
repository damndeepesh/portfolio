import type { NextConfig } from "next";

// https://deepeshgupta.dev/recalla is the Recalla landing page. Its source lives
// in github.com/damndeepesh/recalla (folder web/) and is deployed to GitHub Pages;
// these rewrites proxy it so the address stays on this domain. The page is built
// for the /recalla/ base path and works with or without the trailing slash.
const RECALLA_SITE = "https://damndeepesh.github.io/recalla";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/recalla", destination: `${RECALLA_SITE}/` },
      { source: "/recalla/:path*", destination: `${RECALLA_SITE}/:path*` },
    ];
  },
};

export default nextConfig;
