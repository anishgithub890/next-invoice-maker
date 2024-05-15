import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

import prismadb from '@/lib/prismadb';

export async function GET(
  req: Request,
  { params }: { params: { registerId: string } }
) {
  try {
    if (!params.registerId) {
      return new NextResponse('Register Id is required', { status: 400 });
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: params.registerId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log('[REGISTER_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { registerId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.registerId) {
      return new NextResponse('Register Id is required', { status: 400 });
    }

    const user = await prismadb.user.delete({
      where: {
        id: params.registerId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log('[REGISTER_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { registerId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();

    const { name, email, role, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    if (!currentUser) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!email) {
      return new NextResponse('Email is required', { status: 400 });
    }

    if (!role) {
      return new NextResponse('Role is required', { status: 400 });
    }
    if (!hashedPassword) {
      return new NextResponse('Hashed-Password is required', { status: 400 });
    }

    if (!params.registerId) {
      return new NextResponse('Register id is required', { status: 400 });
    }

    const user = await prismadb.user.update({
      where: {
        id: params.registerId,
      },
      data: {
        name,
        email,
        role,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log('[REGISTER_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
