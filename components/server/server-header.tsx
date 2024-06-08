'use client';

import {
  LayoutDashboard,
  LogIn,
  LogOut,
  PlusCircle,
  Users,
} from 'lucide-react';
import { AiOutlineProfile } from 'react-icons/ai';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { SafeUser } from '@/app/types';
import { useModal } from '@/hooks/use-modal-store';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from '@/components/user-avatar';
import { Button } from '@/components/ui/button';

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
              onClick={() => router.push('/dashboard')}
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
              onClick={() => router.push('/generate-invoice')}
            >
              <AiOutlineProfile className="mr-2 h-4 w-4" />
              <span>Create Invoice</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => router.push('/adminusers')}
            >
              <Users className="mr-2 h-4 w-4" />
              <span>Manage Users</span>
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
