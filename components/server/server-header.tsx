'use client';

import {
  Contact,
  LayoutDashboard,
  LogIn,
  LogOut,
  Medal,
  PlusCircle,
  Scale,
  Users,
} from 'lucide-react';
import { GiSkills } from 'react-icons/gi';
import { MdReviews } from 'react-icons/md';
import { GoProjectSymlink } from 'react-icons/go';
import { AiOutlineProfile } from 'react-icons/ai';
import { MdEditNote } from 'react-icons/md';
import { CgMoreVerticalR } from 'react-icons/cg';
import { VscFeedback } from 'react-icons/vsc';
import { SiGnuprivacyguard } from 'react-icons/si';
import { GrServices } from 'react-icons/gr';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { SafeUser } from '@/app/types';
import { useModal } from '@/hooks/use-modal-store';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from '@/components/user-avatar';
import { Button } from '../ui/button';

interface ServerHeaderProps {
  currentUser?: SafeUser | null;
}

export const ServerHeader: React.FC<ServerHeaderProps> = ({ currentUser }) => {
  const { onOpen } = useModal();

  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <div className="w-full text-md font-semibold px-3 flex items-center h-12 transition">
          <div
            className="
              p-[0.35rem]
              flex
              flex-row
              items-center
              gap-3
              cursor-pointer
              transition
            "
          >
            <div>
              {currentUser ? (
                <>
                  <UserAvatar src={currentUser?.imageUrl} />
                </>
              ) : (
                <>
                  <Button variant="outline" size="default">
                    Log In
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {currentUser?.role == 'user' ? (
          <>
            <DropdownMenuLabel className="pl-4">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => router.push('/profile')}
            >
              <AiOutlineProfile className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </>
        ) : currentUser?.role == 'admin' ? (
          <>
            <DropdownMenuLabel className="pl-4">
              Admin Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => router.push('/admindashboard')}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => router.push('/profile')}
            >
              <AiOutlineProfile className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => router.push('/adminusers')}
            >
              <Users className="mr-2 h-4 w-4" />
              <span>Manage Users</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => router.push('/adminskills')}
            >
              <GiSkills className="mr-2 h-4 w-4" />
              <span>Manage Skills</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => router.push('/adminexperiences')}
            >
              <Medal className="mr-2 h-4 w-4" />
              <span>Manage Experiences</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => router.push('/admintestimonials')}
            >
              <MdReviews className="mr-2 h-4 w-4" />
              <span>Manage Testimonials</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => router.push('/adminprojects')}
            >
              <GoProjectSymlink className="mr-2 h-4 w-4" />
              <span>Manage Projects</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => router.push('/adminresume')}
            >
              <MdEditNote className="mr-2 h-4 w-4" />
              <span>Manage Resume</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="px-3 py-2 text-sm cursor-pointer">
                <Scale className="mr-2 h-4 w-4" />
                <span>Legal Policy</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    className="px-3 py-2 text-sm cursor-pointer"
                    onClick={() => router.push('/adminprivacypolicy')}
                  >
                    <SiGnuprivacyguard className="mr-2 h-4 w-4" />
                    <span>Privacy Policy</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="px-3 py-2 text-sm cursor-pointer"
                    onClick={() => router.push('/admintermservice')}
                  >
                    <GrServices className="mr-2 h-4 w-4" />
                    <span>Term Service</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="px-3 py-2 text-sm cursor-pointer">
                <CgMoreVerticalR className="mr-2 h-4 w-4" />
                <span>Contact & Feedback</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    className="px-3 py-2 text-sm cursor-pointer"
                    onClick={() => router.push('/admincontacts')}
                  >
                    <Contact className="mr-2 h-4 w-4" />
                    <span>Manage Contacts</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="px-3 py-2 text-sm cursor-pointer"
                    onClick={() => router.push('/adminfeedbacks')}
                  >
                    <VscFeedback className="mr-2 h-4 w-4" />
                    <span>Manage Feedbacks</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem
              onClick={() => onOpen('login')}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Log in
              <LogIn className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onOpen('createUser')}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              Sign Up
              <PlusCircle className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
