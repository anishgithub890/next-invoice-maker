import prisma from '@/lib/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

import Container from '@/components/container';
import ClientOnly from '@/components/client-only';
import RoleState from '@/components/role-state';
import { VoucherForm } from './components/Quotation-form';

const AdminGenerateQuotationPage = async ({
  params,
}: {
  params: { generatequotationId: string };
}) => {
  const voucher = await prisma.voucher.findFirst({
    where: {
      id: params.generatequotationId,
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
          <VoucherForm initialData={voucher} />
        </div>
      </Container>
    </div>
  );
};

export default AdminGenerateQuotationPage;