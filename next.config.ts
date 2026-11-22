import type { NextConfig } from "next";

// https://deepeshgupta.dev/recalla is the Recalla landing page. Its source lives in
// github.com/damndeepesh/recalla (folder web/); a copy is committed under
// public/recalla/ so it is served as plain static files by any host (including
// the Cloudflare adapter). The page is built for the /recalla/ base path and
// works with or without the trailing slash. To update it, run the sync command
// from that repo's web/README.md.
const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/recalla", destination: "/recalla/index.html" }];
  },
};

export default nextConfig;
