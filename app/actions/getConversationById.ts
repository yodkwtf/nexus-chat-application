import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return null;

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: {
          where: {
            id: {
              not: currentUser.id,
            },
          },
        },
      },
    });

    return conversation;
  } catch (error: any) {
    return null;
  }
};

export default getConversationById;
