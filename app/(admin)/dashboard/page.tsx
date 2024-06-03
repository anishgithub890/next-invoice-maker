import prisma from '@/lib/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

import Container from '@/components/container';
import RoleState from '@/components/role-state';
import DashboardRefresh from './dashboard-refresh';
import DashboardCard from './dashboard-card';
import { UserColumn } from '../adminusers/components/columns';
import { InvoiceColumn } from '../generate-invoice/components/columns';

const AdminDashboardPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <RoleState showReset title="Unauthorized" description="Please login" />
    );
  }

  const voucherNumber: InvoiceColumn[] = (
    await prisma.voucher.findMany({})
  ).map(() => ({}));

  const userNumber: UserColumn[] = (await prisma.user.findMany({})).map(
    () => ({})
  );

  return (
    <>
      <Container>
        <div className="flex-col mt-12">
          {currentUser?.role == 'user' ? (
            <div>
              <RoleState
                showReset
                title="Unauthorized"
                description="Please login"
              />
            </div>
          ) : currentUser?.role == 'admin' ? (
            <div className="flex-1 space-y-4 p-8 pt-5">
              <div>
                <DashboardRefresh />
              </div>
              <DashboardCard vch={voucherNumber} usr={userNumber} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </Container>
    </>
  );
};

export default AdminDashboardPage;
