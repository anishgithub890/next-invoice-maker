import ClientOnly from '@/components/client-only';
import getCurrentUser from '@/app/api/actions/getCurrentUser';
import Navbar from '@/components/navbar/navbar';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <main>
        <ClientOnly>
          <Navbar currentUser={currentUser} />
          {children}
        </ClientOnly>
      </main>
    </div>
  );
};

export default MainLayout;
