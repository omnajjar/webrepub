import { useEditor } from '@craftjs/core';
import { CSSProperties } from 'react';
import { IconType } from 'react-icons';
import { TbSquare } from 'react-icons/tb';
import { TfiText } from 'react-icons/tfi';
import { List, SidenavProps } from 'rsuite';

import { ContainerComponent } from '@/desginer/components/Container';
import { TextComponent } from '@/desginer/components/Text';

type ComponentsBoxProps = SidenavProps;

export function ComponentsBox(
  { expanded }: ComponentsBoxProps = { expanded: false }
) {
  const { connectors } = useEditor();

  return (
    <List hover>
      <List.Item
        ref={(ref) => {
          if (ref) {
            connectors.create(ref, <TextComponent text='Hi text!' />);
          }
        }}
      >
        <ComponentItem icon={TfiText} name='Text' expanded={expanded ?? true} />
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
          name='Container'
          expanded={expanded ?? true}
        />
      </List.Item>
    </List>
  );
}

interface ComponentItemProps {
  name: string;
  icon: IconType;
  expanded: boolean;
}

const componentIconStyle: CSSProperties = {
  fontSize: '24px',
};

const componentItemStyle: CSSProperties = {
  padding: '10px',
};

const componentNameStyle: CSSProperties = {
  fontSize: '18px',
  marginLeft: '14px',
};

function ComponentItem({ name, icon: Icon, expanded }: ComponentItemProps) {
  return (
    <div
      style={componentItemStyle}
      className={`pointer-grab flex w-full items-center ${
        expanded ? '' : 'space-around'
      }`}
    >
      <Icon style={componentIconStyle} />
      {expanded ? <div style={componentNameStyle}>{name}</div> : null}
    </div>
  );
}
