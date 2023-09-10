import prisma from '@/app/libs/prismadb';
import getSession from './getSession';

const getUsers = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) return [];

    // Get all users except the current user
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        NOT: {
          email: session.user.email as string,
        },
      },
    });

    if (!users) return [];

    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
