'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CustomeButton from '@/components/custome-button';
import { HeadingTheme } from '@/components/ui/heading-theme';

interface EmptyStateProps {
  title?: string;
  description?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "OOOPS! It's Empty",
  description = "Looks like you haven't added any data yet..!!",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div className="h-[35vh] flex flex-col gap-2 justify-center items-center">
      <Image src="/images/empty.png" alt="empty" width={150} height={150} />
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

export default EmptyState;
