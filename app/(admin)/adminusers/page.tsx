import { format } from 'date-fns';
import Head from 'next/head';

import prisma from '@/lib/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

import { UserColumn } from './components/columns';
import { UserClient } from './components/client';
import Container from '@/components/container';
import RoleState from '@/components/role-state';

const AdminUsersPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <RoleState title="Unauthorized" description="Please login" />;
  }

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedusers: UserColumn[] = users.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    role: item.role,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col mt-12">
      <Head>
        <title>ANISH | ADMIN-USER</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        {currentUser?.role == 'user' ? (
          <div>
            <RoleState
              showReset
              title="Unauthorized"
              description="Please login"
            />
          </div>
        ) : currentUser?.role == 'admin' ? (
          <>
            <div className="flex-1 space-y-4 p-8 pt-6">
              <UserClient data={formattedusers} />
            </div>
          </>
        ) : (
          <></>
        )}
      </Container>
    </div>
  );
};

export default AdminUsersPage;
