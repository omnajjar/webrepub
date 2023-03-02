import { PlusCircleIcon } from '@heroicons/react/outline';

import Button from '@/components/buttons/Button';
import { NewFolder } from '@/components/svg/NewFolderIcon';

interface EmptyProjectsProps {
  onCreateProjectClicked: () => void;
}

export function EmptyProjects({ onCreateProjectClicked }: EmptyProjectsProps) {
  return (
    <div className='text-center'>
      <NewFolder className='text-gray-500' />
      <h3 className='mt-2 text-sm font-medium text-gray-900'>No projects</h3>
      <p className='mt-1 text-sm text-gray-500'>
        Get started by creating a new project.
      </p>
      <div className='mt-6'>
        <Button
          leftIcon={(props) => <PlusCircleIcon {...props} />}
          leftIconClassName='-ml-1 mr-2 h-5 w-5'
          onClick={onCreateProjectClicked}
        >
          New Project
        </Button>
      </div>
    </div>
  );
}
