'use client';

import { ReceiptText } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { HeadingTheme } from '@/components/ui/heading-theme';
import { Separator } from '@/components/ui/separator';

import { columns, InvoiceColumn } from './columns';
import { useCallback } from 'react';

interface InvoiceClientProps {
  data: InvoiceColumn[];
}

export const InvoiceClient: React.FC<InvoiceClientProps> = ({ data }) => {
  const router = useRouter();

  const goToNewInvoice = useCallback(() => {
    router.push('/generate-invoice/new');
    // router.push('/invoices/new');
  }, [router]);

  return (
    <>
      <div className="flex items-center justify-between">
        <HeadingTheme
          title={`Invoices (${data.length})`}
          description="Manage invoices"
        />
        <Button onClick={goToNewInvoice}>
          <ReceiptText className="mr-2 h-4 w-4" /> Add Invoice
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <HeadingTheme title="API" description="API Calls for Invoices" />
      <Separator />
    </>
  );
};
