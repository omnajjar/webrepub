import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/buttons/Button';

import { Database } from '@/schema';

interface EditProjectFormProps {
  project: Database['public']['Tables']['projects']['Row'];
}

export function EditProjectForm({ project }: EditProjectFormProps) {
  const supabase = useSupabaseClient<Database>();

  const [projectName, setProjectName] = useState(project.name);
  const [description, setDescription] = useState(project.description ?? '');
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
      .update({ name: projectName, description })
      .eq('id', project.id)
      .select()
      .single();

    setLoading(false);

    if (error) {
      toast.error(`Oops! Failed to save your changes (code: ${error?.code})`);
    } else {
      setProjectName(data.name);
      setDescription(data.description ?? '');
      toast.success('Changes saved successfully!');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className='px-1 sm:overflow-hidden sm:rounded-md'>
        <div className='mb-4 space-y-6'>
          <div className='grid grid-cols-6 gap-6'>
            <div className='col-span-6'>
              <label
                htmlFor='projectId'
                className='block text-sm font-medium text-gray-700'
              >
                Project ID
              </label>
              <input
                type='text'
                value={project.id}
                name='projectId'
                disabled
                className='mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
              />
            </div>
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
                rows={5}
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
            loadingCaption='Saving...'
            isLoading={loading}
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
