'use client';

import { useEffect, useState } from 'react';

import { CreateRegisterModal } from '@/components/credential-modal/create-register-modal';
import { LoginModal } from '@/components/credential-modal/login-modal ';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateRegisterModal />
      <LoginModal />
    </>
  );
};
