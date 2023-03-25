import { useEditor } from '@craftjs/core';
import { CSSProperties } from 'react';
import React from 'react';
import { IconType } from 'react-icons';
import { BiPointer } from 'react-icons/bi';
import { BsCardImage } from 'react-icons/bs';
import { TbSquare } from 'react-icons/tb';
import { TfiLayoutColumn3, TfiText } from 'react-icons/tfi';
import { List, Tooltip, Whisper } from 'rsuite';

import { ContainerComponent } from '@/desginer/designComponents/Container';
import { StackComponent } from '@/desginer/designComponents/Stack';
import { TextComponent } from '@/desginer/designComponents/Text';

export function ComponentsBar() {
  const { connectors, actions } = useEditor();

  return (
    <List hover className='fancy-components-box-shadow'>
      <List.Item onClick={actions.clearEvents}>
        <ComponentItem icon={BiPointer} name='Unselect' draggable={false} />
      </List.Item>
      <List.Item
        ref={(ref) => {
          if (ref) {
            connectors.create(ref, <TextComponent text='Text' />);
          }
        }}
      >
        <ComponentItem
          icon={TfiText}
          name={TextComponent.displayName ?? 'Text'}
          draggable={true}
        />
      </List.Item>
      <List.Item>
        <ComponentItem icon={BsCardImage} name='Image' draggable={true} />
      </List.Item>
      <List.Item
        ref={(ref) => {
          if (ref) {
            connectors.create(ref, <ContainerComponent />);
          }
        }}
      >
        <ComponentItem
          icon={TbSquare}
          name={ContainerComponent.displayName ?? 'Container'}
          draggable={true}
        />
      </List.Item>
      <List.Item
        ref={(ref) => {
          if (ref) {
            connectors.create(ref, <StackComponent />);
          }
        }}
      >
        <ComponentItem
          icon={TfiLayoutColumn3}
          name={StackComponent.displayName ?? 'Stack'}
          draggable={true}
        />
      </List.Item>
    </List>
  );
}

interface ComponentItemProps {
  name: string;
  icon: IconType;
  draggable: boolean;
}

const componentIconStyle: CSSProperties = {
  fontSize: '24px',
};

const componentItemStyle: CSSProperties = {
  padding: '10px',
};

function ComponentItem({ name, icon: Icon, draggable }: ComponentItemProps) {
  return (
    <Whisper placement='right' speaker={<Tooltip>{name}</Tooltip>}>
      <div
        style={componentItemStyle}
        className={`flex w-full items-center space-around ${
          draggable ? 'pointer-grab' : 'pointer-cursor'
        }`}
      >
        <Icon style={componentIconStyle} />
      </div>
    </Whisper>
  );
}
