/* tslint:disable */
import { useEditor } from '@craftjs/core';
import { Layers } from '@craftjs/layers';
import { PencilIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Toolbar } from '@/packages/designer/nextEditor/Toolbar';

import { SidebarItem } from './SidebarItem';

import LayerIcon from '~/icons/layers.svg';

export const SidebarDiv = styled.div<{ enabled: boolean }>`
  width: 300px;
  opacity: ${(props) => (props.enabled ? 1 : 0)};
  background: #fff;
  margin-right: ${(props) => (props.enabled ? 0 : -280)}px;
`;

export const Sidebar = () => {
  const [layersVisible, setLayerVisible] = useState(true);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <SidebarDiv enabled={enabled} className='sidebar w-2 bg-white transition'>
      <div className='flex h-full flex-col'>
        <SidebarItem
          icon={PencilIcon}
          iconClassName='w-5 h-5'
          title='Customize'
          height={!layersVisible ? 'full' : '55%'}
          visible={toolbarVisible}
          onChange={(val) => setToolbarVisible(val)}
        >
          <Toolbar />
        </SidebarItem>
        <SidebarItem
          icon={LayerIcon}
          title='Layers'
          height={!toolbarVisible ? 'full' : '45%'}
          visible={layersVisible}
          onChange={(val) => setLayerVisible(val)}
        >
          <Layers expandRootOnLoad={true} />
        </SidebarItem>
      </div>
    </SidebarDiv>
  );
};
