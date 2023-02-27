import { PlusCircleIcon } from '@heroicons/react/outline';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import Button from '@/components/buttons/Button';
import { MainLayout } from '@/components/layout/MainLayout';
import { NewFolder } from '@/components/svg/NewFolder';

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
  if (projects.length === 0) {
    return <NoProjects />;
  }

  return (
    <section>
      <div>{`Found ${projects?.length} project`}</div>
    </section>
  );
}

Projects.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout title='Projects'>{page}</MainLayout>;
};

Projects.protected = true;

function NoProjects() {
  return (
    <div className='text-center'>
      <NewFolder />
      <h3 className='mt-2 text-sm font-medium text-gray-900'>No projects</h3>
      <p className='mt-1 text-sm text-gray-500'>
        Get started by creating a new project.
      </p>
      <div className='mt-6'>
        <Button
          leftIcon={(props) => <PlusCircleIcon {...props} />}
          leftIconClassName='-ml-1 mr-2 h-5 w-5'
        >
          New Project
        </Button>
      </div>
    </div>
  );
}

export default Projects;
