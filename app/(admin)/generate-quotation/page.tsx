import { format } from 'date-fns';

import prisma from '@/lib/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

import { QuotationColumn } from './components/columns';
import { QuotationClient } from './components/client';
import Container from '@/components/container';
import RoleState from '@/components/role-state';

const QuotationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <RoleState title="Unauthorized" description="Please login" />;
  }

  const vouchers = await prisma.voucher.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedQuotations: QuotationColumn[] = vouchers.map((item) => ({
    id: item.id,
    customerName: item.customerName,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col mt-12">
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
              <QuotationClient data={formattedQuotations} />
            </div>
          </>
        ) : (
          <></>
        )}
      </Container>
    </div>
  );
};

export default QuotationPage;
