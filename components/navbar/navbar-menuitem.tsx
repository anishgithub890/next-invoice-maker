'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const routes = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Project',
    href: '/project',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

const NavbarMenuItem = () => {
  const pathname = usePathname();
  return (
    <div className="hidden md:block">
      <div className="flex flex-row items-center gap-2 pt-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'cursor-pointer dark:hover:text-white hover:text-zinc-900 dark:hover:bg-white/10 hover:bg-zinc-200 transition',
              pathname === route.href
                ? 'dark:text-white text-zinc-700 dark:bg-white/10 text-sm py-3 px-4 rounded-md bg-neutral-100 transition cursor-pointer font-semibold'
                : 'text-zinc-400 text-sm py-3 px-4 rounded-md hover:bg-neutral-100 transition cursor-pointer'
            )}
          >
            <div className="flex flex-col cursor-pointer">{route.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavbarMenuItem;
