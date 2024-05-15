'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import { AiFillProject } from 'react-icons/ai';
import { MdContacts } from 'react-icons/md';

import { Montserrat } from 'next/font/google';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import Logo from '@/components/logo';

const poppins = Montserrat({ weight: '700', subsets: ['latin'] });

const routes = [
  {
    label: 'Home',
    icon: Home,
    href: '/home',
    color: 'text-sky-500',
  },
  {
    label: 'Test 2',
    icon: AiFillProject,
    href: '/home',
    color: 'text-violet-500',
  },
  {
    label: 'Test 3',
    icon: MdContacts,
    href: '/',
    color: 'text-pink-700',
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-2 py-1 flex flex-col h-full bg-zinc-50 dark:bg-[#111827] text-white">
      <div className="px-3 py-2 pt-1 flex-1">
        <div className="flex items-center pl-3 mb-14">
          <Logo />
          <h1
            className={cn(
              'text-2xl pl-2 flex font-bold text-zinc-900 dark:text-white',
              poppins.className
            )}
          >
            A-N-I-S-H
          </h1>
        </div>

        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer dark:hover:text-white hover:text-zinc-900 dark:hover:bg-white/10 hover:bg-zinc-200 rounded-lg transition',
                pathname === route.href
                  ? 'dark:text-white text-zinc-700 dark:bg-white/10 bg-zinc-200'
                  : 'text-zinc-400'
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
