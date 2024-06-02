import prismadb from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

type CreateVoucherData = {
  items: { itemName: string; rate: number; qty: number }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const data: CreateVoucherData = req.body;

  try {
    const voucherItems = data.items.map((item) => ({
      itemName: item.itemName,
      rate: item.rate,
      qty: item.qty,
      total: item.rate * item.qty,
    }));

    const total = voucherItems.reduce((acc, item) => acc + item.total, 0);

    const voucher = await prismadb.voucher.create({
      data: {
        items: { create: voucherItems },
        total,
      },
    });

    return res.status(200).json({ voucher });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating voucher' });
  }
}
