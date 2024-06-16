'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type QuotationColumn = {
  id?: string;
  name?: string;
  createdAt?: string;
};

export const columns: ColumnDef<QuotationColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  // {
  //   accessorKey: 'explanation',
  //   header: 'Explanation',
  //   cell: ({ row }) => (
  //     <div className="flex items-center">
  //       <Preview value={row.original.explanation} />
  //     </div>
  //   ),
  // },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
