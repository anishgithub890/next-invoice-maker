import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';

import './globals.css';
import ClientOnly from '@/components/client-only';
import { ModalProvider } from '@/components/providers/modal-provider';
import { Toaster } from '@/components/ui/sonner';
import getCurrentUser from './api/actions/getCurrentUser';
import NavbarMenuItem from '@/components/navbar/navbar-menuitem';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Invoice Maker',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ClientOnly>
          <ModalProvider />
          <Toaster />
          <NavbarMenuItem />
          {children}
        </ClientOnly>
      </body>
    </html>
  );
}
