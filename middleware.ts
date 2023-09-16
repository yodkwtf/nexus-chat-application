import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/', // Display sign in page as a normal page
  },
});

export const config = {
  matcher: ['/users/:path*', '/conversations/:path*'], // pages that should be protected
};
