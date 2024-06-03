'use client';

import * as React from 'react';
import { IoMdRefresh } from 'react-icons/io';

import { useRouter } from 'next/navigation';
import CustomeButton from '@/components/custome-button';

const DashboardRefresh = () => {
  const router = useRouter();

  return (
    <>
      <div className="pt-2 flex flex-col sm:flex-row gap-4">
        <CustomeButton
          outline
          label="Refresh Data"
          icon={IoMdRefresh}
          onClick={() => router.refresh()}
        />
      </div>
    </>
  );
};

export default DashboardRefresh;
