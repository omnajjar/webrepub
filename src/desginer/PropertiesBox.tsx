import { useEditor } from '@craftjs/core';
import React from 'react';

export const PropertiesBox = () => {
  const { selected } = useEditor((state) => {
    const [currentNodeId] = Array.from(state.events.selected);
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
      };
    }

    return {
      selected,
    };
  });

  if (!selected) {
    return (
      <div className='flex w-full justify-center p-4'>
        <h1 className='text-gray-500'>Please select an element to edit</h1>
      </div>
    );
  }

  if (!selected.settings) {
    return (
      <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col'>
          <h1>No props to configure</h1>
          <p></p>
        </div>
      </div>
    );
  }

  return <div className='w-full'>{React.createElement(selected.settings)}</div>;
};
