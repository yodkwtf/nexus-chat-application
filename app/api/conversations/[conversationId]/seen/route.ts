import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { pusherServer } from '@/app/libs/pusher';

interface IParams {
  conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    //  find the existing conversation
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    // find the last message that was sent by the other user
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    // Update the seen status of the last message
    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        seen: true,
        sender: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    // update the seen status of the conversation
    await pusherServer.trigger(currentUser.email, 'conversation:update', {
      id: conversationId,
      messages: [updatedMessage],
    });

    // if the last message was seen by the current user, return the conversation
    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation);
    }

    // if the last message was not seen by the current user, return the updated message
    await pusherServer.trigger(
      conversationId!,
      'message:update',
      updatedMessage
    );

    return NextResponse.json(updatedMessage);
  } catch (error: any) {
    console.log(error, 'ERROR_MESSAGES_SEEN');
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
