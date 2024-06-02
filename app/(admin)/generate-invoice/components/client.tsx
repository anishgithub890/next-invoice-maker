'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { HeadingTheme } from '@/components/ui/heading-theme';
import { Separator } from '@/components/ui/separator';

import { columns, InvoiceColumn } from './columns';

interface InvoiceClientProps {
  data: InvoiceColumn[];
}

export const InvoiceClient: React.FC<InvoiceClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <HeadingTheme
          title={`Voucher (${data.length})`}
          description="Manage invoices"
        />
        <Button onClick={() => router.push(`/generate-invoice/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <HeadingTheme title="API" description="API Calls for Voucher" />
      <Separator />
    </>
  );
};
