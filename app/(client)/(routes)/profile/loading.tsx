'use client';

import { Loader } from '@/components/ui/loader';

const Loading = () => {
  return (
    <div className="flex h-[60vh] w-full items-center justify-center pt-24">
      <Loader />
    </div>
  );
};

export default Loading;
