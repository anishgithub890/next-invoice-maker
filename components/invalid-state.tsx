'use client';

import { MdOutlineLinkOff } from 'react-icons/md';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface InvalidStateProps {
  showReset?: boolean;
  name?: string;
  link?: string;
}

const InvalidState: React.FC<InvalidStateProps> = ({
  name,
  link,
  showReset,
}) => {
  const router = useRouter();
  return (
    <div className="h-[35vh] flex flex-col gap-2 justify-center items-center">
      <Button
        variant="outline"
        size="sm"
        className="text-center cursor-not-allowed border p-2 rounded-sm text-rose-700 hover:text-rose-700 bg-rose-100 hover:bg-rose-100 transition"
      >
        <MdOutlineLinkOff className="mr-2 h-4 w-4" /> oops! invalid url...
      </Button>

      <div className="pt-2">
        {showReset && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`${link}`)}
          >
            {name}
          </Button>
        )}
      </div>
    </div>
  );
};

export default InvalidState;
