import { PlusCircleIcon } from '@heroicons/react/outline';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/buttons/Button';
import { IDAvatar } from '@/components/IDAvatar';
import { MainLayout } from '@/components/layout/MainLayout';
import { Modal } from '@/components/Modal';
import { NewFolder } from '@/components/svg/NewFolder';

import { Database } from '@/schema';
import { ensure } from '@/utils';

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
      <div>
        {projects.map(({ id }) => (
          <div key={id} className='m-7'>
            <IDAvatar
              id={id}
              className='rounded-full shadow-lg shadow-2xl'
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
      <NoProjects />
    </section>
  );
}

Projects.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout title='Projects'>{page}</MainLayout>;
};

Projects.protected = true;

function NoProjects() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
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
            onClick={() => setShowModal(true)}
          >
            New Project
          </Button>
        </div>
      </div>
      <Modal isOpen={showModal} setIsOpen={setShowModal}>
        <NewProjectForm
          onFormSubmit={() => {
            setShowModal(false);
          }}
        />
      </Modal>
    </>
  );
}

interface NewProjectFormProps {
  onFormSubmit?: () => void;
}

function NewProjectForm({ onFormSubmit }: NewProjectFormProps) {
  const supabase = useSupabaseClient<Database>();
  const user = ensure(useUser());
  const router = useRouter();

  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleProjectNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setProjectName(e.target.value);
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const { data, error } = await supabase
      .from('projects')
      .insert([{ name: projectName, description, owner: user.id }])
      .select()
      .single();

    setLoading(false);

    if (error) {
      toast.error(
        `Oops! Failed to create a new project (code: ${error?.code})`
      );
    } else {
      toast.success('Project created successfully!');
      if (onFormSubmit) {
        onFormSubmit();
      }

      router.push(`/projects/${data.id}`);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className='px-1 sm:overflow-hidden sm:rounded-md'>
        <div className='mb-4 space-y-6 bg-white'>
          <div>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              New Project
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Fill in the details to create a new prject
            </p>
          </div>

          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6'>
              <label
                htmlFor='projectName'
                className='block text-sm font-medium text-gray-700'
              >
                Project name
              </label>
              <input
                type='text'
                name='projectName'
                id='projectName'
                placeholder='e.g. checkout document, payslip statment, my cool doc!'
                value={projectName}
                onChange={handleProjectNameChange}
                className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
              />
            </div>

            <div className='col-span-6'>
              <label
                htmlFor='description'
                className='block text-sm font-medium text-gray-700'
              >
                Description
              </label>
              <textarea
                name='description'
                id='description'
                value={description}
                placeholder='e.g. add what information this document shows..'
                onChange={handleDescriptionChange}
                className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
              />
            </div>
          </div>
        </div>
        <div className='border-t py-3'>
          <Button
            variant='success'
            type='submit'
            loadingCaption='Creating...'
            isLoading={loading}
          >
            Create
          </Button>
        </div>
      </div>
    </form>
  );
}

export default Projects;
