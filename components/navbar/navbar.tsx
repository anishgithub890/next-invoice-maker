'use client';

import { useEffect, useState } from 'react';
import { RiTwitterXFill } from 'react-icons/ri';

import { SafeUser } from '@/app/types';

import Container from '@/components/container';

import NavbarMenuItem from '@/components/navbar/navbar-menuitem';

import { MobileSidebar } from '@/components/navbar/navbar-mobilesidebar';
import { Separator } from '@/components/ui/separator';
import { ServerHeader } from '@/components/server/server-header';

import Logo from '../logo';

const TOP_OFFSET = 66;

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed @container w-full bg-white dark:bg-zinc-700 top-0 left-0 right-0 z-50 shadow-sm ${
        showBackground
          ? 'bg-zinc-100 bg-opacity-50 backdrop-blur-md transition-all'
          : ''
      }`}
    >
      <div
        className="
        py-[0.8px]
        border-b-[1px]
        "
      >
        <Container>
          <div
            className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-1
            md:gap-0
            pt-1
            pr-3
            pl-3
          "
          >
            <div className="hidden md:block pb-1">
              <Logo currentUser={currentUser} />
            </div>

            <div className="pl-2">
              <MobileSidebar />
            </div>

            <div className="pb-2 mt-auto flex items-center flex-row pr-2">
              <div className="pr-6">
                <NavbarMenuItem />
              </div>
              <div className="h-10 hidden md:block">
                <Separator orientation="vertical" />
              </div>
              <div className="flex flex-col">
                <ServerHeader currentUser={currentUser} />
              </div>
              <div className="hidden md:block flex-col pr-2">
                <a
                  id="twitterLink"
                  href="https://twitter.com/anishpabe"
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-muted cursor-pointer dark:bg-zinc-900 border"
                >
                  <RiTwitterXFill className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
