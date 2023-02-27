import { ExternalLinkIcon } from '@heroicons/react/solid';
import Link from 'next/link';

import { IDAvatar } from '@/components/IDAvatar';

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
      <div className='flex w-full items-center justify-around px-4'>
        <ExternalLinkIcon
          className='h-5 w-5 text-gray-400'
          aria-hidden='true'
        />
        <Link
          href={`/projects/${id}`}
          className='relative mx-2 -mr-px w-40 flex-1 items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded-bl-lg border border-transparent py-3 text-sm font-medium text-gray-700 hover:text-gray-500'
        >
          <span className='overflow-hidden text-ellipsis whitespace-nowrap'>
            {name}
          </span>
        </Link>
      </div>
    </li>
  );
}
