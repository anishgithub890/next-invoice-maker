import prisma from '@/lib/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

import { UserForm } from './components/user-form';
import Container from '@/components/container';
import ClientOnly from '@/components/client-only';
import RoleState from '@/components/role-state';

const AdminUserPage = async ({
  params,
}: {
  params: { adminuserId: string };
}) => {
  const user = await prisma.user.findFirst({
    where: {
      id: params.adminuserId,
    },
  });

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <div className="pt-24">
          <RoleState />
        </div>
      </ClientOnly>
    );
  }

  return (
    <div className="flex-col mt-10">
      <Container>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <UserForm initialData={user} />
        </div>
      </Container>
    </div>
  );
};

export default AdminUserPage;
