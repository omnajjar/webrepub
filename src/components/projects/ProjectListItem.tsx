import { ExternalLinkIcon } from '@heroicons/react/solid';
import Link from 'next/link';

import { IDAvatar } from '@/components/IDAvatar';
import { NewFolder } from '@/components/svg/NewFolder';

import { Database } from '@/schema';
import { ensure } from '@/utils';

interface ProjectListItemProps {
  project: Partial<Database['public']['Tables']['projects']['Row']>;
}

export function ProjectListItem({ project }: ProjectListItemProps) {
  const { id, name } = project;
  return (
    <li className='flex-6 w-48 divide-y divide-gray-200 rounded-lg bg-white shadow grayscale'>
      <div className='flex w-full items-center justify-center space-x-6'>
        <IDAvatar
          id={ensure(id)}
          className='w-full rounded-t-lg'
          width={100}
          height={100}
        />
      </div>
      <div>
        <div className='-mt-px flex divide-x divide-gray-200'>
          <div className='flex w-0 flex-1'>
            <Link
              href={`/projects/${id}`}
              className='relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500'
            >
              <ExternalLinkIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
              <span className='mx-2 w-40 overflow-hidden text-ellipsis whitespace-nowrap'>
                {name}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

interface NewProjectListItemProps {
  onClick: () => void;
}

export function NewProjectListItem({ onClick }: NewProjectListItemProps) {
  return (
    <li
      className='flex-6 w-48 rounded-lg bg-white shadow  hover:cursor-pointer'
      onClick={onClick}
    >
      <div className='flex h-full w-full flex-col items-center justify-center text-gray-400  hover:text-blue-600'>
        <NewFolder />
        <div className='h5'>New project</div>
      </div>
    </li>
  );
}
