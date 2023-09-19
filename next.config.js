/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      // cloudinary
      'res.cloudinary.com',
      // github login
      'avatars.githubusercontent.com',
      // google login
      'lh3.googleusercontent.com',
      // twitter login
      'pbs.twimg.com',
    ],
  },
};

module.exports = nextConfig;
