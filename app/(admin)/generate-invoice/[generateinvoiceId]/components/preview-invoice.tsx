import React, { useRef } from 'react';
import { format } from 'date-fns';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@/components/ui/button';

interface Item {
  id: string;
  item: string;
  quantity: number;
  price: number;
  total: number;
}

interface InvoiceValues {
  name: string;
  email: string;
  address: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  invoiceDate?: string;
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

interface PreviewInvoiceProps {
  values: InvoiceValues;
}

const PreviewInvoice: React.FC<PreviewInvoiceProps> = ({ values }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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

        {/* Invoice Details */}
        <section className="mb-8 text-right">
          <h2 className="text-2xl text-slate-900 font-bold">TAX INVOICE</h2>
          <p className="text-muted-foreground">
            Invoice date:{' '}
            {values.invoiceDate &&
              format(new Date(values.invoiceDate), 'do MMMM yyyy')}
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
                <th className="p-2 border">Item Name</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">VAT 5%</th>
              </tr>
            </thead>
            <tbody>
              {values.items.map((item) => (
                <tr key={item.id}>
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
                    {(item.total * 0.05).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="p-2 border"></td>
                <td className="p-2 border text-right text-slate-900 font-bold">
                  Subtotal
                </td>
                <td className="p-2 border text-slate-900 font-bold">
                  {values.totalAmount}
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="p-2 border"></td>
                <td className="p-2 border text-right text-slate-900 font-bold">
                  VAT (5%)
                </td>
                <td className="p-2 border text-slate-900 font-bold">
                  {values.vat}
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="p-2 border"></td>
                <td className="p-2 border text-right text-slate-900 font-bold">
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
        </footer>
      </div>

      <div className="mt-4">
        <Button variant="outline" size="lg" onClick={handlePrint}>
          Print Invoice
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

export default PreviewInvoice;
