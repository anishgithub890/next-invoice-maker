import ClientOnly from '@/components/client-only';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <main>
        <ClientOnly>{children}</ClientOnly>
      </main>
    </div>
  );
};

export default MainLayout;
