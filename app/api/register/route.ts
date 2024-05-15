import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import prisma from '@/lib/prismadb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    if (!email) {
      return new NextResponse('Email is required.', { status: 400 });
    }
    if (!name) {
      return new NextResponse('Name is required.', { status: 400 });
    }
    if (!password) {
      return new NextResponse('Password is required.', { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log('[USER_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
