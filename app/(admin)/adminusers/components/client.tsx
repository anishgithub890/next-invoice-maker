'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { HeadingTheme } from '@/components/ui/heading-theme';
import { Separator } from '@/components/ui/separator';

import { columns, UserColumn } from './columns';

interface UserClientProps {
  data: UserColumn[];
}

export const UserClient: React.FC<UserClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <HeadingTheme
          title={`User (${data.length})`}
          description="Manage users for your portfolio"
        />
        <Button onClick={() => router.push(`/adminusers/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <HeadingTheme title="API" description="API Calls for Users" />
      <Separator />
    </>
  );
};
