import { getServerSession } from 'next-auth';

import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}
