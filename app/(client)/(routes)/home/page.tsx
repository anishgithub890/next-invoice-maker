import ClientOnly from '@/components/client-only';
import Container from '@/components/container';
import getCurrentUser from '@/app/api/actions/getCurrentUser';
import Navbar from '@/components/navbar/navbar';

const HomePage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <>
      <ClientOnly>
        <Container>
          <Navbar currentUser={currentUser} />
          <div className="pt-[2px]">
            <h2 className="font-bold text-3xl text-center pt-4 underline underline-offset-8">
              Skills
            </h2>
          </div>
        </Container>
      </ClientOnly>
    </>
  );
};

export default HomePage;
