import getCurrentUser from '@/app/api/actions/getCurrentUser';
import ClientOnly from '@/components/client-only';
import IntroCard from './intro-card';

const InvoicerPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <>
      <ClientOnly>
        <div className="pt-[2px]">
          {/* intro-screen */}
          <div>
            <IntroCard currentUser={currentUser} />
          </div>
        </div>
      </ClientOnly>
    </>
  );
};

export default InvoicerPage;
