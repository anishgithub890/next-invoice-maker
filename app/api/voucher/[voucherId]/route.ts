import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/api/actions/getCurrentUser';

import prisma from '@/lib/prismadb';

interface VoucherItem {
  name: string;
  price: number;
}

export async function GET(
  req: Request,
  { params }: { params: { voucherId: string } }
) {
  try {
    if (!params.voucherId) {
      return new NextResponse('Voucher id is required', { status: 400 });
    }

    const voucher = await prisma.voucher.findUnique({
      where: {
        id: params.voucherId,
      },
    });

    return NextResponse.json(voucher);
  } catch (error) {
    console.log('[VOUCHERS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { voucherId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.voucherId) {
      return new NextResponse('Voucher id is required', { status: 400 });
    }

    const voucher = await prisma.voucher.delete({
      where: {
        id: params.voucherId,
      },
    });

    return NextResponse.json(voucher);
  } catch (error) {
    console.log('[VOUCHERS_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { voucherId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();

    const { customerName, date, total, items } = body;

    if (!currentUser) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!customerName) {
      return new NextResponse('Customer name is required', { status: 400 });
    }

    if (!date) {
      return new NextResponse('Date is required', { status: 400 });
    }
    if (!total) {
      return new NextResponse('Total is required', { status: 400 });
    }
    // if (!items) {
    //   return new NextResponse('Item is required', { status: 400 });
    // }

    if (!params.voucherId) {
      return new NextResponse('Voucher id is required', { status: 400 });
    }

    const voucher = await prisma.voucher.update({
      where: {
        id: params.voucherId,
      },
      data: {
        customerName,
        date,
        total,
        items: {
          updateMany: body.items.map((item: VoucherItem) => ({
            id: params.voucherId,
            data: {
              name: item.name,
              price: item.price,
            },
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(voucher);
  } catch (error) {
    console.log('[PROJECTS_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
