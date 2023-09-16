import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { name, image } = body;

    // check current user
    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // update user
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        image,
      },
    });

    // return updated user
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error, 'ERROR_PROFILE_UPDATE');
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
