'use client';

import { signOut } from 'next-auth/react';

const Users = () => {
  return <button onClick={() => signOut()}>Sign Out</button>;
};
export default Users;
