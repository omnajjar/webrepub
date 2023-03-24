import { useNode, UserComponent } from '@craftjs/core';
import { CSSProperties } from 'react';

import { ContainerComponentSettings } from '@/desginer/designComponents/Container/ContainerSettings';

export type ContainerComponentProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'is'
>;

const defaultContainerComponentStyles: CSSProperties = {
  padding: '8px',
};

const requiredContainerComponentStyles: CSSProperties = {
  display: 'flex',
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
        ...defaultContainerComponentStyles,
        ...style,
        ...requiredContainerComponentStyles,
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
