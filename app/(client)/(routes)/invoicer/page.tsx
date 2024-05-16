import getCurrentUser from '@/app/api/actions/getCurrentUser';
import ClientOnly from '@/components/client-only';
import Container from '@/components/container';
import IntroCard from './intro-card';

const InvoicerPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <>
      <ClientOnly>
        <Container>
          <div className="pt-[2px]">
            {/* intro-screen */}
            <div>
              <IntroCard />
            </div>
          </div>
        </Container>
      </ClientOnly>
    </>
  );
};

export default InvoicerPage;
