import Link from 'next/link';
import { GoProjectSymlink } from 'react-icons/go';
import { Users } from 'lucide-react';
import { FaFileInvoice } from 'react-icons/fa';

import { UserColumn } from '../adminusers/components/columns';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { InvoiceColumn } from '../generate-invoice/components/columns';

interface DashboardCardProps {
  usr: UserColumn[];
  vch: InvoiceColumn[];
}

const DashboardCard: React.FC<DashboardCardProps> = async ({ usr, vch }) => {
  const MNG = [
    {
      name: 'Manage Users',
      link: '/adminusers',
      count: `[${usr.length}]`,
      icon: Users,
      color: 'text-violet-500',
      tooltip: 'As a admin Read, write, update and delete ',
    },

    {
      name: 'Manage Invoices',
      link: '/generate-invoice',
      count: `[${vch.length}]`,
      icon: FaFileInvoice,
      color: 'text-sky-500',
      tooltip: 'Voucher Read, write, update and delete ',
    },
  ];
  return (
    <>
      <div
        className="
        pt-5
        grid 
        grid-cols-1 
        sm:grid-cols-1 
        md:grid-cols-1
        lg:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
        gap-4
        "
      >
        {MNG.map((data, key) => (
          <div key={key}>
            <div className="md:flex bg-slate-100 hover:bg-slate-200 transition rounded-md p-8 md:p-0">
              <div className="md:p-8 text-center md:text-left space-y-4">
                <div className="flex gap-4 dark:text-zinc-900">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="absolute rounded-xl bg-slate-300 p-4">
                          <data.icon className={cn('h-6 w-6', data.color)} />
                        </div>
                      </TooltipTrigger>
                      <TooltipTrigger asChild>
                        <Link
                          href={data.link}
                          className="dark:text-zinc-900 flex gap-2"
                        >
                          <div className="text-center flex">
                            <p className="p-4 break-all text-md pl-[5rem] font-semibold hover:underline hover:underline-offset-[3px] transition">
                              {data.name} {data.count}
                            </p>
                          </div>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-semibold text-md p-2">
                          {data.tooltip}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DashboardCard;
