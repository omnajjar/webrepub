import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { MainLayout } from '@/components/layout/MainLayout';
import { ProjectPageLayout } from '@/components/layout/ProjectPageLayout';
import { EditProjectForm } from '@/components/projects/EditProjectForm';

import { Database } from '@/schema';
import { ensure } from '@/utils';

type EditProjectProps = InferGetServerSidePropsType<typeof getServerSideProps>;

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

function Project({ project }: EditProjectProps) {
  return (
    <section>
      <EditProjectForm project={ensure(project)} />
    </section>
  );
}

Project.getLayout = function getLayout(page: JSX.Element) {
  return (
    <MainLayout title='Project'>
      <ProjectPageLayout>{page}</ProjectPageLayout>
    </MainLayout>
  );
};

Project.protected = true;

export default Project;
