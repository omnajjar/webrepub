import { TrashIcon } from '@heroicons/react/outline';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useState } from 'react';

import Button from '@/components/buttons/Button';
import { MainLayout } from '@/components/layout/MainLayout';
import { Modal } from '@/components/Modal';
import { DeleteProjectForm } from '@/components/projects/DeleteProjectForm';

import { Database } from '@/schema';
import { ensure } from '@/utils';

type ProjectSettingsProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient<Database>(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const projectId = ensure(ctx.params).projectId;

  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();

  return {
    props: {
      project: data,
    },
  };
}

function Settings({ project }: ProjectSettingsProps) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <section>
      <Button
        leftIcon={TrashIcon}
        leftIconClassName='-ml-1 mr-2 h-5 w-5'
        onClick={openModal}
        className='bg-red-500 outline-red-500 hover:bg-red-700 focus:ring-red-500'
      >
        Delete project
      </Button>
      <Modal isOpen={showModal} setIsOpen={setShowModal}>
        <DeleteProjectForm
          project={ensure(project)}
          onFormSubmit={closeModal}
          onCancel={closeModal}
        />
      </Modal>
    </section>
  );
}

Settings.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout title='Project settings'>{page}</MainLayout>;
};

Settings.protected = true;

export default Settings;
