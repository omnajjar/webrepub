import { PencilIcon } from '@heroicons/react/outline';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import Button from '@/components/buttons/Button';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProjectPageLayout } from '@/components/layout/ProjectPageLayout';

import { Database } from '@/schema';
import { ensure } from '@/utils';

import DocumentIcon from '~/icons/document.svg';

type ProjectOverviewProps = InferGetServerSidePropsType<
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
function Overview({ _project }: ProjectOverviewProps) {
  // TODO: For new projects render ability to start from a desing template
  // or render continue to design.
  return (
    <section className='flex h-full flex-col items-center justify-center'>
      <DocumentIcon fill='#6B7280' className='my-10 h-44 w-44' />
      <Button
        leftIcon={PencilIcon}
        leftIconClassName='-ml-1 mr-2 h-5 w-5'
        loadingCaption='Deleting...'
        className='ml-2 -mt-2'
      >
        Start designing your document
      </Button>
    </section>
  );
}

Overview.getLayout = function getLayout(page: JSX.Element) {
  return (
    <MainLayout title='Project'>
      <ProjectPageLayout>{page}</ProjectPageLayout>
    </MainLayout>
  );
};

Overview.protected = true;

export default Overview;
