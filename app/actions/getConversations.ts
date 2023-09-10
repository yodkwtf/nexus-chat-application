import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

const getConversations = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) return [];

    // Get all users except the current user
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
            sender: true,
          },
        },
      },
    });

    if (!conversations) return [];

    return conversations;
  } catch (error: any) {
    return [];
  }
};

export default getConversations;
