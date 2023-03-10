import { useEditor } from '@craftjs/core';
import { PencilIcon } from '@heroicons/react/solid';

import { TextComponent } from '@/desginer/components/Text';
import { classNames } from '@/utils';

export const ComponentsBox = () => {
  const { connectors, _query } = useEditor();

  return (
    <div className='mt-6 w-full flex-1 space-y-1 px-2'>
      <div
        className='cursor-grab'
        ref={(ref) => {
          if (ref) {
            connectors.create(ref, <TextComponent text='Hi text!' />);
          }
        }}
      >
        <ComponentItem name='Text' icon={PencilIcon}></ComponentItem>
      </div>
    </div>
  );
};

interface ComponentItemProps {
  name: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
}

function ComponentItem({ name, icon: Icon }: ComponentItemProps) {
  return (
    <a
      className={classNames(
        ' text-indigo-100 hover:bg-indigo-800 hover:text-white',
        'group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium',
        'select-none'
      )}
    >
      <Icon
        className={classNames(
          'h-12  text-indigo-100 hover:bg-indigo-800 hover:text-white',
          'group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium'
        )}
      />
      <span>{name}</span>
    </a>
  );
}
