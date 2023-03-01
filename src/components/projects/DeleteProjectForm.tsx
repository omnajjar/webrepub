import { TrashIcon } from '@heroicons/react/outline';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { WarningAlert } from '@/components/Alerts/Warning';
import Button from '@/components/buttons/Button';

import { Database } from '@/schema';

interface DeleteProjectFormProps {
  project: Database['public']['Tables']['projects']['Row'];
  onFormSubmit?: () => void;
}

export function DeleteProjectForm({
  project,
  onFormSubmit,
}: DeleteProjectFormProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [confirmedProjectName, setConfirmedProjectName] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = useSupabaseClient<Database>();
  const router = useRouter();

  const handleConfirmProjectNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setConfirmedProjectName(v);
    if (v === project.name) {
      setConfirmed(true);
    } else {
      setConfirmed(false);
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', project.id);

    setLoading(false);

    if (error) {
      toast.error(`Oops! Failed to delete your project (code: ${error?.code})`);
    } else {
      toast.info(`Successfuly deleted project '${project.name}'`);
      if (onFormSubmit) {
        onFormSubmit();
      }
      router.push('/projects');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className='px-1 sm:overflow-hidden sm:rounded-md'>
        <div className='mb-4 space-y-6 bg-white'>
          <div>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Delete Project
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Permanently delete your project!
            </p>
          </div>
          <WarningAlert
            title='Warning'
            message='Are you sure you want to delete your project? This action cannot be undone and you will permanently lose your project!'
          >
            <br></br>
            In order to proceed, please confirm by filling in the project name '
            <strong>{project.name}</strong>' in the field below
          </WarningAlert>

          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6'>
              <label
                htmlFor='projectNameConfirmation'
                className='block text-sm font-medium text-gray-700'
              >
                Project name
              </label>
              <input
                type='text'
                name='projectNameConfirmation'
                id='projectNameConfirmation'
                placeholder='Confirm your project name'
                onChange={handleConfirmProjectNameChange}
                value={confirmedProjectName}
                className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
              />
            </div>
          </div>
        </div>
        <div className='border-t py-3'>
          <Button
            leftIcon={TrashIcon}
            leftIconClassName='-ml-1 mr-2 h-5 w-5'
            type='submit'
            loadingCaption='Deleting...'
            className={
              confirmed
                ? 'bg-red-500 hover:bg-red-700'
                : 'bg-gray-500 hover:bg-gray-500'
            }
            disabled={!confirmed}
            isLoading={loading}
          >
            Delete
          </Button>
        </div>
      </div>
    </form>
  );
}
