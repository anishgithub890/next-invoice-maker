'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CustomeButton from '@/components/custome-button';
import { HeadingTheme } from '@/components/ui/heading-theme';

interface RoleStateProps {
  title?: string;
  description?: string;
  showReset?: boolean;
}

const RoleState: React.FC<RoleStateProps> = ({
  title = 'OOOPS! ACCESS DENIED',
  description = 'This page not for users....!!!',
  showReset,
}) => {
  const router = useRouter();

  return (
    <div
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2
        justify-center 
        items-center
        pt-1
      "
    >
      <Image
        src="/images/unauthorized.png"
        alt="unauthorized"
        width={300}
        height={300}
        className="dark:bg-slate-400 rounded-md"
      />
      <HeadingTheme center title={title} description={description} />
      <div className="w-48 mt-4">
        {showReset && (
          <CustomeButton
            outline
            label="Home"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  );
};

export default RoleState;
