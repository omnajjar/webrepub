import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { Header } from '@/components/common/Header';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProjectPageLayout } from '@/components/layout/ProjectPageLayout';
import { EditProjectForm } from '@/components/projects/EditProjectForm';

import { Database } from '@/schema';
import { ensure } from '@/utils';

type ProjectDetailsProps = InferGetServerSidePropsType<
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

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project: data,
    },
  };
}

function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <section>
      <Header
        title='Edit project'
        subtitle='Fill in the details to edit your prject'
      />
      <EditProjectForm project={project} />
    </section>
  );
}

ProjectDetails.getLayout = function getLayout(page: JSX.Element) {
  return (
    <MainLayout title='Project'>
      <ProjectPageLayout>{page}</ProjectPageLayout>
    </MainLayout>
  );
};

ProjectDetails.protected = true;

export default ProjectDetails;
