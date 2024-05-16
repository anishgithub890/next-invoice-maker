'use client';

import { useRouter } from 'next/navigation';

import { SafeUser } from '@/app/types';
import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/user-avatar';

interface ProfileClientProps {
  currentUser?: SafeUser | null;
}

const EditProfileClient = ({ currentUser }: ProfileClientProps) => {
  const router = useRouter();
  return (
    <Container>
      <div className="w-full pt-32">
        <div className="flex flex-col justify-center max-w-screen-sm mx-auto bg-white dark:bg-zinc-600 shadow-xl rounded-xl p-5">
          <div className="">
            <UserAvatar
              src={currentUser?.imageUrl}
              className="w-16 h-16 mx-auto shadow-xl rounded-full"
            />
          </div>
          <div className="text-center mt-5">
            <p className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              {/* Company :&nbsp; */}
              <span className="text-violet-600 dark:text-slate-100">
                {currentUser?.company}
              </span>
            </p>

            <p className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Name :&nbsp;
              <span className="text-violet-600 dark:text-slate-100">
                {currentUser?.name}
              </span>
            </p>
            <p className="text-xs sm:text-base text-zinc-800 dark:text-white pt-2 pb-4 px-5 w-auto inline-block border-b-2">
              Email :&nbsp; {currentUser?.email}
            </p>
            <p className="text-xs sm:text-base text-zinc-800 dark:text-white pt-2 pb-4 px-5 w-auto inline-block border-b-2">
              Role :&nbsp; {currentUser?.role}
            </p>
            <div className="flex align-center justify-center mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/profile/${currentUser?.id}`)}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default EditProfileClient;
