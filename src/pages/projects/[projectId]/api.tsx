import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { Header } from '@/components/common/Header';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProjectPageLayout } from '@/components/layout/ProjectPageLayout';
import { APITokenView } from '@/components/projects/APITokenView';

import { Database } from '@/schema';
import { ensure } from '@/utils';

type ProjectAPIProps = InferGetServerSidePropsType<typeof getServerSideProps>;

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
    .from('project_tokens')
    .select('*')
    .eq('project_id', projectId)
    .single();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project_token: data,
    },
  };
}

function ProjectAPI({ project_token: { token } }: ProjectAPIProps) {
  return (
    <section>
      <Header
        title='API'
        subtitle="Project's API key for programmatically accessing the project"
      />
      <APITokenView token={token} />
    </section>
  );
}

ProjectAPI.getLayout = function getLayout(page: JSX.Element) {
  return (
    <MainLayout title='Project'>
      <ProjectPageLayout>{page}</ProjectPageLayout>
    </MainLayout>
  );
};

ProjectAPI.protected = true;

export default ProjectAPI;
