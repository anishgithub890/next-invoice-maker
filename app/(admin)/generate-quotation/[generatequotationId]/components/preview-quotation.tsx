import React, { useRef } from 'react';
import { format } from 'date-fns';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@/components/ui/button';
// import QRCode from 'qrcode.react';

interface Item {
  id: string;
  item: string;
  quantity: number;
  price: number;
  total: number;
}

interface QuotationValues {
  name: string;
  email: string;
  address: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  quotationDate?: string;
  dueDate?: string;
  items: Item[];
  totalAmount: number;
  vat: number;
  taxableAmount: number;
  notes?: string;
  bankName?: string;
  bankAccountNumber?: string;
  phoneNumber?: string;
}

interface PreviewQuotationProps {
  values: QuotationValues;
}

const PreviewQuotation: React.FC<PreviewQuotationProps> = ({ values }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownload = () => {
    if (componentRef.current) {
      import('html2canvas').then((html2canvas) => {
        import('jspdf').then((jsPDF) => {
          const element = componentRef.current!;
          const width = element.offsetWidth;
          const height = element.offsetHeight;
          const scale = 2; // Increase scale for better quality (optional)

          html2canvas.default(element, { scale: scale }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF.default('p', 'mm', 'a4');

            // Calculate the aspect ratio to maintain proper width on the PDF
            const aspectRatio = width / height;
            const pdfWidth = 210; // A4 width in mm
            const pdfHeight = pdfWidth / aspectRatio;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${values.name || 'quotation'}.pdf`);
          });
        });
      });
    }
  };

  return (
    <>
      <div
        ref={componentRef}
        id="pdf"
        className="bg-white border border-slate-300 p-4 rounded-lg scale-75"
      >
        {/* Header Section */}
        <header className="flex justify-between items-center mb-8">
          <img src="/images/wing.png" alt="Logo" className="w-20 h-20" />
          <div className="text-right">
            <h2 className="text-2xl text-slate-900 font-bold">{values.name}</h2>
            <p className="text-muted-foreground">{values.email}</p>
            <p className="text-muted-foreground">{values.address}</p>
          </div>
        </header>

        {/* Client Information */}
        <section className="mb-8">
          <h2 className="text-2xl text-slate-900 font-bold">
            {values.clientName}
          </h2>
          <p className="text-muted-foreground">{values.clientEmail}</p>
          <p className="text-muted-foreground">{values.clientAddress}</p>
        </section>

        {/* Quotation Details */}
        <section className="mb-8 text-right">
          <h2 className="text-2xl text-slate-900 font-bold">Quotation</h2>
          <p className="text-muted-foreground">
            Quotation date:{' '}
            {values.quotationDate &&
              format(new Date(values.quotationDate), 'do MMMM yyyy')}
          </p>
          <p className="text-muted-foreground">
            Due date:{' '}
            {values.dueDate && format(new Date(values.dueDate), 'do MMMM yyyy')}
          </p>
        </section>

        {/* Items Table */}
        <section className="mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-200 text-left">
                <th className="p-2 border">SI No.</th>
                <th className="p-2 border">Item Name</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">VAT 5%</th>
              </tr>
            </thead>
            <tbody>
              {values.items.map((item, index) => (
                <tr key={item.id}>
                  <td className="p-2 border text-muted-foreground text-sm">
                    {index + 1}
                  </td>
                  <td className="p-2 border text-muted-foreground text-sm">
                    {item.item}
                  </td>
                  <td className="p-2 border text-muted-foreground text-sm">
                    {item.quantity}
                  </td>
                  <td className="p-2 border text-muted-foreground text-sm">
                    {item.price}
                  </td>
                  <td className="p-2 border text-muted-foreground text-sm">
                    {item.total}
                  </td>
                  <td className="p-2 border text-muted-foreground text-sm">
                    {(item.total * 0.05).toFixed(3)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={4}
                  className="p-2 border text-right text-slate-900 font-bold"
                >
                  Subtotal
                </td>
                <td className="p-2 border text-slate-900 font-bold">
                  {values.totalAmount}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={4}
                  className="p-2 border text-right text-slate-900 font-bold"
                >
                  VAT (5%)
                </td>
                <td className="p-2 border text-slate-900 font-bold">
                  {values.vat.toFixed(3)}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={4}
                  className="p-2 border text-right text-slate-900 font-bold"
                >
                  Total
                </td>
                <td className="p-2 border text-slate-900 font-bold">
                  {values.taxableAmount}
                </td>
              </tr>
            </tfoot>
          </table>
        </section>

        {/* Additional Notes */}
        {values.notes && (
          <section className="mb-8">
            <h4 className="text-lg text-slate-800 font-bold">
              Additional notes
            </h4>
            <p className="text-muted-foreground w-1/2 text-xs">
              {values.notes}
            </p>
          </section>
        )}

        {/* Footer Information */}
        <footer className="border-t border-slate-300 py-8">
          <ul className="flex flex-wrap items-center justify-center gap-4">
            <li className="text-muted-foreground text-sm">
              <span className="text-slate-800 font-bold">Email:</span>{' '}
              {values.email}
            </li>
            <li className="text-muted-foreground text-sm">
              <span className="text-slate-800 font-bold">
                Bank Account Holder:
              </span>{' '}
              {values.name}
            </li>
            <li className="text-muted-foreground text-sm">
              <span className="text-slate-800 font-bold">Bank Name:</span>{' '}
              {values.bankName}
            </li>
            <li className="text-muted-foreground text-sm">
              <span className="text-slate-800 font-bold">
                Bank Account Number:
              </span>{' '}
              {values.bankAccountNumber}
            </li>
            <li className="text-muted-foreground text-sm">
              <span className="text-slate-800 font-bold">Phone Number:</span>{' '}
              {values.phoneNumber}
            </li>
          </ul>
          {/* QR Code */}
          {/* <div className="mt-4 flex justify-end"> */}
          {/* <div className="w-24"> */}
          {/* <h3 className="text-sm text-slate-800 font-bold">Scan QR</h3> */}
          {/* <QRCode
                value="https://anishpabe.vercel.app"
                size={64}
                className="pt-1"
              /> */}
          {/* </div> */}
          {/* </div> */}
        </footer>
      </div>

      <div className="mt-4 flex space-x-4">
        <Button variant="outline" size="lg" onClick={handlePrint}>
          Print Quotation
        </Button>
        <Button variant="outline" size="lg" onClick={handleDownload}>
          Download Quotation
        </Button>
      </div>

      <style jsx>{`
        @media print {
          #pdf {
            width: 100%;
            border: none;
            padding: 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th,
          td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
          }
          .text-muted-foreground {
            color: #6b7280;
          }
        }
      `}</style>
    </>
  );
};

export default PreviewQuotation;
