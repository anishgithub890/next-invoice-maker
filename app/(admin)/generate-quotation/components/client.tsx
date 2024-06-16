'use client';

import { ReceiptText } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { HeadingTheme } from '@/components/ui/heading-theme';
import { Separator } from '@/components/ui/separator';

import { columns, QuotationColumn } from './columns';
import { useCallback } from 'react';

interface QuotationClientProps {
  data: QuotationColumn[];
}

export const QuotationClient: React.FC<QuotationClientProps> = ({ data }) => {
  const router = useRouter();

  const goToNewQuotation = useCallback(() => {
    router.push('/generate-quotation/new');
  }, [router]);

  return (
    <>
      <div className="flex items-center justify-between">
        <HeadingTheme
          title={`Quotations (${data.length})`}
          description="Manage quotation"
        />
        <Button onClick={goToNewQuotation}>
          <ReceiptText className="mr-2 h-4 w-4" /> Add Quotation
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <HeadingTheme title="API" description="API Calls for quotation" />
      <Separator />
    </>
  );
};
