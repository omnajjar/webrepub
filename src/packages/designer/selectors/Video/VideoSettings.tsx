import React from 'react';

import { ToolbarItem, ToolbarSection } from '../../editor';

export const VideoSettings = () => {
  return (
    <React.Fragment>
      <ToolbarSection title='Youtube'>
        <ToolbarItem
          full={true}
          propKey='videoId'
          type='text'
          label='Video ID'
        />
      </ToolbarSection>
    </React.Fragment>
  );
};
