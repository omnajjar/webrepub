import { useNode, UserComponent } from '@craftjs/core';
import { CSSProperties } from 'react';

import { ContainerComponentSettings } from '@/desginer/designComponents/Container/ContainerSettings';

export type ContainerComponentProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'is'
>;

const requiredContainerComponentStyles: CSSProperties = {
  display: 'flex',
};

const userConfiguredStyles: CSSProperties = {
  paddingTop: '8px',
  paddingBottom: '8px',
  paddingLeft: '8px',
  paddingRight: '8px',

  marginTop: '0px',
  marginBottom: '0px',
  marginLeft: '0px',
  marginRight: '0px',

  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  flexGrow: 1,
  rowGap: '5px',
  columnGap: '5px',
};

export const ContainerComponent: UserComponent<ContainerComponentProps> = ({
  children,
  style,
  ...props
}: ContainerComponentProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      style={{
        ...userConfiguredStyles,
        ...requiredContainerComponentStyles,
        ...style,
      }}
      {...props}
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
    >
      {children ? children : <EmptyContainerContent></EmptyContainerContent>}
    </div>
  );
};

function EmptyContainerContent() {
  return (
    <div className='empty-container-bg empty-container-size flex items-center justify-center '>
      <span>Container</span>
    </div>
  );
}

ContainerComponent.craft = {
  displayName: 'Container',
  isCanvas: true,
  props: {
    style: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    },
  },
  rules: {
    canMoveIn: () => true,
    canDrag: () => true,
  },
  related: {
    settings: ContainerComponentSettings,
  },
};
