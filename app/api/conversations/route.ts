import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { pusherServer } from '@/app/libs/pusher';

export async function POST(request: Request) {
  try {
    // Get current user
    const currentUser = await getCurrentUser();
    // Get request body
    const body = await request.json();
    // Get data from body (single user & group)
    const { userId, isGroup, members, name } = body;

    // Check if current user exists
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // if all data is there for group
    if (isGroup && (!members || !name || members.length < 2)) {
      return new NextResponse('Group should atleast have 3 members', {
        status: 400,
      });
    }

    // create group chats
    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              { id: currentUser.id },
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
            ],
          },
        },
        include: {
          users: true,
        },
      });

      // trigger pusher event for each user
      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, 'conversation:new', newConversation);
        }
      });

      return NextResponse.json(newConversation);
    }

    // create single chat
    // first check if conversation already exists
    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const existingConversation = existingConversations[0];

    if (existingConversation) {
      return NextResponse.json(existingConversation);
    }

    // if not create new conversation
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [{ id: currentUser.id }, { id: userId }],
        },
      },
      include: {
        users: true,
      },
    });

    newConversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:new', newConversation);
      }
    });

    return NextResponse.json(newConversation);
  } catch (error: any) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
