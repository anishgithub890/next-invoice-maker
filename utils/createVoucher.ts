// utils/createVoucher.ts
import { PDFDocument, rgb } from 'pdf-lib';

interface VoucherDetails {
  customerName: string;
  date: string;
  items: { name: string; price: number }[];
  total: number;
}

export const createVoucherPDF = async (voucherDetails: VoucherDetails) => {
  const { customerName, date, items, total } = voucherDetails;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const { height } = page.getSize();

  page.drawText('Sales Voucher', {
    x: 50,
    y: height - 50,
    size: 25,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Customer Name: ${customerName}`, {
    x: 50,
    y: height - 80,
    size: 15,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Date: ${date}`, {
    x: 50,
    y: height - 100,
    size: 15,
    color: rgb(0, 0, 0),
  });

  let yPosition = height - 140;
  items.forEach((item, index) => {
    page.drawText(`${index + 1}. ${item.name} - $${item.price}`, {
      x: 50,
      y: yPosition,
      size: 12,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20;
  });

  page.drawText(`Total: $${total}`, {
    x: 50,
    y: yPosition - 20,
    size: 15,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
