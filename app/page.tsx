'use client';

import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal-store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { onOpen } = useModal();
  const router = useRouter();

  return (
    <div className="p-4">
      <header className="flex items-center justify-between">
        <Button variant="outline">
          <Link href="/">Invoicer</Link>
        </Button>
        <ul className="flex items-center gap-4">
          <li>
            <Button onClick={() => onOpen('login')}>Sign In</Button>
          </li>
          <li>
            <Button onClick={() => onOpen('createUser')} variant="secondary">
              Sign Up
            </Button>
          </li>
        </ul>
      </header>

      <section className="relative py-32 space-y-8 max-w-4xl mx-auto text-center">
        <div className="absolute left-0 top-0 h-40 w-40 bg-pink-400 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 h-40 w-40 bg-blue-400 blur-[100px]"></div>

        <h1 className="text-4xl lg:text-5xl text-slate-800 font-bold">
          Welcome to Invoice Maker V-0
        </h1>
        <p className="text-muted-foreground text-lg lg:text-xl">
          Easily create invoices for yourself, your clients all at the
          convenience of your mobile phone or PC. Invoice maker offers improved
          performance, better responsiveness on mobile, and better UI design by
          Developer.
        </p>
        <ul className="flex items-center justify-center gap-4">
          <li>
            <Button onClick={() => onOpen('login')}>Sign In</Button>
          </li>
          <li>
            <Button onClick={() => onOpen('createUser')} variant="secondary">
              Sign Up
            </Button>
          </li>
        </ul>
      </section>
    </div>
  );
}
