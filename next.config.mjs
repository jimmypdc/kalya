/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The memorial gallery reads the public/kayla folder at build & revalidation
  // time (via fs). Ensure those files are bundled with the server function so
  // the directory read also works at runtime on serverless hosts (Vercel).
  outputFileTracingIncludes: {
    '/': ['./public/hero.jpg'],
    '/memorial': ['./public/kayla/**/*'],
  },
  images: {
    // Allow remote placeholder images. Swap/extend these when real photos
    // of Kayla are hosted (e.g. Supabase Storage, Vercel Blob, a CDN).
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
};

export default nextConfig;
