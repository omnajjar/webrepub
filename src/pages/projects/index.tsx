import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useState } from 'react';

import { MainLayout } from '@/components/layout/MainLayout';
import { Modal } from '@/components/Modal';
import { EmptyProjects } from '@/components/projects/EmptyProjects';
import { NewProjectForm } from '@/components/projects/NewProjectForm';
import { ProjectList } from '@/components/projects/ProjectList';

import { Database } from '@/schema';

type ProjectsProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient<Database>(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const { data } = await supabase.from('projects').select('*');

  return {
    props: {
      projects: data ?? [],
    },
  };
}

function Projects({ projects }: ProjectsProps) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <section>
      {projects.length === 0 ? (
        <EmptyProjects onCreateProjectClicked={openModal} />
      ) : (
        <ProjectList projects={projects} onCreateProjectClicked={openModal} />
      )}
      <Modal isOpen={showModal} setIsOpen={setShowModal}>
        <NewProjectForm onFormSubmit={closeModal} onCancel={closeModal} />
      </Modal>
    </section>
  );
}

Projects.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout title='Projects'>{page}</MainLayout>;
};

Projects.protected = true;

export default Projects;
