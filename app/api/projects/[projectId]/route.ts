import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

import prisma from '@/lib/prismadb';

export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    if (!params.projectId) {
      return new NextResponse('Project id is required', { status: 400 });
    }

    const project = await prisma.project.findUnique({
      where: {
        id: params.projectId,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log('[PROJECTS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.projectId) {
      return new NextResponse('Project id is required', { status: 400 });
    }

    const project = await prisma.project.delete({
      where: {
        id: params.projectId,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log('[PROJECTS_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { projectId: string } }
) {
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

    if (!params.projectId) {
      return new NextResponse('Project id is required', { status: 400 });
    }

    const project = await prisma.project.update({
      where: {
        id: params.projectId,
      },
      data: {
        name,
        explanation,
        viewUrl,
        githubUrl,
        imageUrl,
        isFeatured,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log('[PROJECTS_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
