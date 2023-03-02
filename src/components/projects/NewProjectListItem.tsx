import { NewFolder } from '@/components/svg/NewFolderIcon';

interface NewProjectListItemProps {
  onClick: () => void;
}

export function NewProjectListItem({ onClick }: NewProjectListItemProps) {
  return (
    <li
      className='flex-6 w-48 rounded-lg border-2 border-blue-400  bg-white shadow hover:cursor-pointer hover:border-blue-600'
      onClick={onClick}
    >
      <div className='flex h-full w-full flex-col items-center justify-center text-gray-400  hover:text-blue-600'>
        <NewFolder />
        <div className='h5'>New project</div>
        <p className='mt-1 text-xs'>Create a new a project</p>
      </div>
    </li>
  );
}
