import getCurrentUser from '@/app/api/actions/getCurrentUser';
import ProfileClient from './components/profile-client';
import ClientOnly from '@/components/client-only';
import RoleState from '@/components/role-state';

const EditProfile = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <div className="pt-20">
          <RoleState showReset />
        </div>
      </ClientOnly>
    );
  }

  return (
    <>
      <ClientOnly>
        <ProfileClient currentUser={currentUser} />
      </ClientOnly>
    </>
  );
};

export default EditProfile;
