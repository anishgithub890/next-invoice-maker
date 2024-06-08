'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { SafeUser } from '@/app/types';
import ClientOnly from './client-only';

const MotionLink = motion(Link);

interface LogoProps {
  currentUser?: SafeUser | null;
}

const Logo = ({ currentUser }: LogoProps) => {
  const router = useRouter();
  return (
    <div className="flex-row cursor-pointer">
      <ClientOnly>
        <MotionLink
          href="/"
          onClick={() => router.refresh()}
          className="w-full h-10 pl-1 pr-1 bg-black text-white flex items-center rounded-sm text-base font-bold"
          whileHover={{
            scale: 1.1,
            backgroundColor: [
              '#121212',
              'rgb(131,58,180,1)',
              'rgb(253,29,29,1)',
              'rgb(252,176,69,1)',
              'rgb(131,58,180,1)',
            ],
            transition: { duration: 1, repeat: Infinity, scale: 1.1 },
          }}
        >
          <div>
            {currentUser ? (
              <div>{currentUser?.company}</div>
            ) : (
              <div>Invoicer</div>
            )}
          </div>
        </MotionLink>
      </ClientOnly>
    </div>
  );
};

export default Logo;
