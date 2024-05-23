import ClientOnly from '@/components/client-only';
import getCurrentUser from '@/app/api/actions/getCurrentUser';
import InvoicerPage from './(client)/(routes)/invoicer/page';
import Navbar from '@/components/navbar/navbar';

export default async function Home() {
  const currentUser = await getCurrentUser();
  return (
    <ClientOnly>
      <div className="h-full relative">
        <main>
          <Navbar currentUser={currentUser} />
          <InvoicerPage />
        </main>
      </div>
    </ClientOnly>
  );
}
