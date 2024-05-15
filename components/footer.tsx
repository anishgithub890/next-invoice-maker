'use client';

import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import { RiTwitterXFill } from 'react-icons/ri';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const YEAR = new Date().getFullYear();

const SOCIAL_MEDIA = [
  {
    icon: Linkedin,
    color: 'text-blue-500',
    link: 'https://www.linkedin.com/in/anishpabe',
    tooltip: 'get my linkedin',
  },
  {
    icon: RiTwitterXFill,
    color: 'text-black-500',
    link: 'https://twitter.com/anishpabe',
    tooltip: 'get my twitter',
  },
];

const ROUTESLINK = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Project',
    link: '/project',
  },
  {
    name: 'Contact',
    link: '/contact',
  },
  {
    name: 'Resume',
    link: '/resume',
  },
];

const HELP = [
  {
    name: 'Contact Us',
    link: '/contact',
  },
];

const RESOURCES = [
  {
    name: 'Discord',
    link: 'https://discord.gg/u6gWupuH',
  },
  {
    name: 'Tailwind Components',
    link: 'https://tailwindcomponents.com',
  },
];

const TECHS = [
  {
    name: 'Next',
    link: 'https://nextjs.org/docs',
  },
  {
    name: 'Shadcn-UI',
    link: 'https://ui.shadcn.com/docs/installation/next',
  },
  {
    name: 'Tailwind-CSS',
    link: 'https://tailwindcss.com/docs/installation',
  },
  {
    name: 'TypeScipt',
    link: 'https://www.typescriptlang.org/',
  },
  {
    name: 'Prisma',
    link: 'https://www.prisma.io/nextjs',
  },
];

export function Footer() {
  const pathname = usePathname();
  return (
    <footer className="z-50 bg-white dark:bg-slate-900/0 px-8 pt-12 pb-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full md:w-4/12">
            <p className="mb-2 text-2xl sm:font-bold font-semibold !text-primary text-zinc-500 dark:text-white/75">
              Shadcn for Front/Back-End UI
            </p>
            <p className="text-md mt-0 mb-2 font-normal text-zinc-500 dark:text-white/75">
              Beautifully designed components that you can copy and paste into
              your apps. Accessible. Customizable. Open Source.
            </p>
            <div className="mt-6 flex">
              {SOCIAL_MEDIA.map((route, key) => (
                <>
                  <div key={key}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            key={route.link}
                            href={route.link}
                            target="_blank"
                            rel="noreferrer"
                            as=""
                          >
                            <div className="font-xl align-center mr-2 inline-block items-center hover:bg-zinc-200 justify-center rounded-full border-[1.5px] border-blue-gray-50 p-3 text-center text-primary dark:bg-zinc-800 hover:dark:bg-zinc-900 outline-none focus:outline-none transition">
                              <route.icon
                                className={cn('h-5 w-5', route.color)}
                              />
                            </div>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">{route.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="ml-auto w-full px-4 md:w-7/12">
            <div className="items-top mb-6 flex flex-wrap">
              <div className="w-6/12 pt-6 md:ml-auto md:px-4 md:pt-0 xl:w-3/12">
                <span className="text-md mb-4 block font-medium text-zinc-900 dark:text-white">
                  Important links
                </span>
                <ul>
                  {ROUTESLINK.map(({ name, link }, key) => (
                    <li key={key}>
                      <Link
                        href={link}
                        as=""
                        className={cn(
                          'block pb-2 text-sm font-normal leading-relaxed text-zinc-500 hover:text-zinc-700 dark:text-white/75 hover:dark:text-white/95 transition-colors',
                          pathname === link
                            ? 'block pb-2 text-sm font-semibold underline underline-offset-2 leading-relaxed text-zinc-900 hover:text-zinc-700 dark:text-white/75 hover:dark:text-white/95 transition-colors'
                            : 'block pb-2 text-sm font-normal leading-relaxed text-zinc-500 hover:text-zinc-700 dark:text-white/75 hover:dark:text-white/95 transition-colors'
                        )}
                      >
                        <div className="flex flex-col cursor-pointer">
                          {name}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ml-auto w-6/12 pt-6 md:px-4 md:pt-0 xl:w-3/12">
                <span className="text-md mb-4 block font-medium text-zinc-900 dark:text-white">
                  Help and Support
                </span>
                <ul>
                  {HELP.map(({ name, link }, key) => (
                    <li key={key}>
                      <Link
                        href={link}
                        as=""
                        className={cn(
                          'block pb-2 text-sm font-normal leading-relaxed text-zinc-500 hover:text-zinc-700 dark:text-white/75 hover:dark:text-white/95 transition-colors',
                          pathname === link
                            ? 'block pb-2 text-sm font-semibold underline underline-offset-2 leading-relaxed text-zinc-900 hover:text-zinc-700 dark:text-white/75 hover:dark:text-white/95 transition-colors'
                            : 'block pb-2 text-sm font-normal leading-relaxed text-zinc-500 hover:text-zinc-700 dark:text-white/75 hover:dark:text-white/95 transition-colors'
                        )}
                      >
                        <div className="flex flex-col cursor-pointer">
                          {name}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ml-auto w-6/12 pt-6 md:px-4 md:pt-0 xl:w-3/12">
                <span className="text-md mb-4 block font-medium text-zinc-900 dark:text-white">
                  Resources
                </span>
                <ul>
                  {RESOURCES.map(({ name, link }, key) => (
                    <li key={key}>
                      <Link
                        href={link}
                        rel="noreferrer"
                        target={name === 'Documentation' ? '_self' : '_blank'}
                        className="block pb-2 text-sm font-normal leading-relaxed text-zinc-500 hover:text-zinc-700 dark:text-white/75 hover:dark:text-white/95 transition-colors"
                        as=""
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ml-auto w-6/12 pt-6 md:px-4 md:pt-0 xl:w-3/12">
                <span className="text-md mb-4 block font-medium text-zinc-900 dark:text-white">
                  Tehnologies
                </span>
                <ul>
                  {TECHS.map(({ name, link }, key) => (
                    <li key={key}>
                      <Link
                        href={link}
                        rel="noreferrer"
                        target="_blank"
                        className="block pb-2 text-sm font-normal leading-relaxed text-zinc-500 hover:text-zinc-700 dark:text-white/75 hover:dark:text-white/95 transition-colors"
                        as=""
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blue-gray-50" />
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="text-center lg:text-left">
            <a
              href="https://vercel.com/?utm_source=ct-tailwind-team&utm_campaign=oss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-semibold text-primary no-underline"
            >
              <span className="mr-1">Powered by</span>
              <span>
                <svg height="22" viewBox="0 0 283 64" fill="none">
                  <path
                    fill="currentColor"
                    d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"
                  ></path>
                </svg>
              </span>
            </a>
            <div className="text-md mt-2 py-1 font-normal text-zinc-900 dark:text-white">
              Copyright &copy; 2023-{YEAR} &nbsp;
              <span className="text-zinc-900 dark:text-white transition">
                Anish Mahato. &nbsp;
              </span>
              <span className="text-zinc-700 dark:text-white transition">
                All rights reserved.
              </span>
            </div>
          </div>
          <div className="ml-auto w-full px-4 text-center md:w-4/12 md:px-0 md:text-right">
            <Link
              href="privacypolicy"
              as=""
              rel="noreferrer"
              className="text-zinc-700 hover:text-zinc-900 dark:text-white hover:underline hover:underline-offset-4  transition-all"
            >
              Privacy Policy
            </Link>
            <span>&nbsp; &nbsp; &nbsp;</span>
            <Link
              href="termservice"
              as=""
              rel="noreferrer"
              className="text-zinc-700 hover:text-zinc-900 dark:text-white hover:underline hover:underline-offset-4 transition-all"
            >
              Term of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
