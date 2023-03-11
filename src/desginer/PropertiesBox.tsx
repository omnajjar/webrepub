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
      <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col'>
          <h1>Please select an element</h1>
          <p></p>
        </div>
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

  return (
    <div className='flex flex-col items-center justify-center'>
      {React.createElement(selected.settings)}
    </div>
  );
};
