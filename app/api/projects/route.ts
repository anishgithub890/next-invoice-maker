import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

import prisma from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();

    const { name, explanation, viewUrl, githubUrl, imageUrl, isFeatured } =
      body;

    if (!currentUser) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }
    if (!explanation) {
      return new NextResponse('Explanation is required', { status: 400 });
    }
    if (!viewUrl) {
      return new NextResponse('View URL is required', { status: 400 });
    }

    if (!githubUrl) {
      return new NextResponse('Github URL is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Image is required', { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        name,
        explanation,
        viewUrl,
        githubUrl,
        imageUrl,
        isFeatured,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log('[PROJECTS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
