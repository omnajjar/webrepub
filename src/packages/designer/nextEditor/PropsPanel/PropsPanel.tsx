import { useEditor } from '@craftjs/core';
import { CursorClickIcon } from '@heroicons/react/solid';
import React from 'react';

import { classNames } from '@/utils';

export function PropsPanel() {
  const { active, related: Related } = useEditor<{
    active: boolean;
    related: {
      toolbar?: React.FC;
    };
  }>((state, query) => {
    // TODO: handle multiple selected elements
    const currentlySelectedNodeId = query.getEvent('selected').first();
    return {
      active: currentlySelectedNodeId,
      related:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
    };
  });

  return (
    <div
      className={classNames('h-full px-2', !active ? 'flex items-center' : '')}
    >
      {active && Related.toolbar ? <Related.toolbar /> : <IdleInfoMessage />}
    </div>
  );
}

export default function IdleInfoMessage() {
  return (
    <div className='rounded-md bg-blue-50 p-4'>
      <div className='flex flex-row'>
        <div className='mr-2'>
          <CursorClickIcon className='h-5  text-blue-400' aria-hidden='true' />
        </div>
        <p className='text-xs'>Click on a component to start editing.</p>
      </div>
    </div>
  );
}
