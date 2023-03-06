import { useEditor } from '@craftjs/core';
import React from 'react';

export * from './ToolbarDropdown';
export * from './ToolbarItem';
export * from './ToolbarSection';
export * from './ToolbarTextInput';

export const Toolbar = () => {
  const { active, related } = useEditor((state, query) => {
    // TODO: handle multiple selected elements
    const currentlySelectedNodeId = query.getEvent('selected').first();
    return {
      active: currentlySelectedNodeId,
      related:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
    };
  });

  return (
    <div className='h-full py-1'>
      {active && related.toolbar && React.createElement(related.toolbar)}
      {!active && (
        <div
          className='flex h-full flex-col items-center justify-center px-5 py-2 text-center'
          style={{
            color: 'rgba(0, 0, 0, 0.5607843137254902)',
            fontSize: '11px',
          }}
        >
          <h2 className='pb-1'>Click on a component to start editing.</h2>
          <h2>
            You could also double click on the layers below to edit their names,
            like in Photoshop
          </h2>
        </div>
      )}
    </div>
  );
};
