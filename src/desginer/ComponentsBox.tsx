import { useEditor } from '@craftjs/core';
import { CSSProperties } from 'react';
import React from 'react';
import { BiPointer } from 'react-icons/bi';
import { BsCardImage } from 'react-icons/bs';
import { TbLink, TbSquare } from 'react-icons/tb';
import { TfiLayoutColumn3, TfiText } from 'react-icons/tfi';
import { List, Tooltip, Whisper } from 'rsuite';

import { ContainerComponent } from '@/desginer/designComponents/Container';
import { ImageComponent } from '@/desginer/designComponents/Image';
import { LinkComponent } from '@/desginer/designComponents/Link';
import { StackComponent } from '@/desginer/designComponents/Stack';
import { TextComponent } from '@/desginer/designComponents/Text';
import { useWebrepub } from '@/desginer/Providers/webrepub';
import { WebrepubComponent } from '@/desginer/types/webrepub';

export function ComponentsBar() {
  const { connectors, actions } = useEditor();
  const {
    presets: { currentPreset },
  } = useWebrepub();

  const presetComponentList = (currentPreset?.components ?? []).map((Comp) => {
    return (
      <List.Item
        key={Comp.craft?.displayName}
        ref={(ref) => {
          if (ref) {
            connectors.create(ref, <Comp />);
          }
        }}
      >
        <ComponentItem
          icon={Comp.icon}
          name={Comp.craft?.displayName ?? 'Component'}
          draggable={true}
        />
      </List.Item>
    );
  });

  return (
    <List hover className='blue-overlap-shadow '>
      <List.Item onClick={actions.clearEvents}>
        <ComponentItem icon={BiPointer} name='Unselect' draggable={false} />
      </List.Item>
      {/* TODO: remove the conditional once all parts of the preset is ready */}
      {presetComponentList.length !== 0 ? (
        presetComponentList
      ) : (
        <>
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
          <List.Item
            ref={(ref) => {
              if (ref) {
                connectors.create(ref, <ImageComponent />);
              }
            }}
          >
            <ComponentItem icon={BsCardImage} name='Image' draggable={true} />
          </List.Item>
          <List.Item
            ref={(ref) => {
              if (ref) {
                connectors.create(ref, <LinkComponent />);
              }
            }}
          >
            <ComponentItem
              icon={TbLink}
              name={LinkComponent.displayName ?? 'Link'}
              draggable={true}
            />
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
        </>
      )}
    </List>
  );
}

interface ComponentItemProps {
  name: string;
  icon: WebrepubComponent['icon'];
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
