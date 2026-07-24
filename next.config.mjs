/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
