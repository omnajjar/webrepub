import { useEditor, useNode, UserComponent } from '@craftjs/core';
import { Children, CSSProperties } from 'react';

import { StackItemComponent } from '@/desginer/designComponents/Stack';
import { StackComponentExtraActions } from '@/desginer/designComponents/Stack/StackComponentExtraActions';
import { StackComponentSettings } from '@/desginer/designComponents/Stack/StackComponentSettings';

const requiredStackComponentStyles: CSSProperties = {
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

export type StackComponentProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'is'
>;

export const StackComponent: UserComponent<StackComponentProps> = ({
  style,
  children,
  ...props
}: StackComponentProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div
      style={{
        ...userConfiguredStyles,
        ...requiredStackComponentStyles,
        ...style,
      }}
      {...props}
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
    >
      {enabled ? (
        Children.count(children) === 0 ? (
          <EmptyStackComponent />
        ) : (
          children
        )
      ) : (
        children
      )}
    </div>
  );
};

function EmptyStackComponent() {
  return (
    <div className='empty-container-bg empty-container-size flex items-center justify-center '>
      <span>Stack</span>
    </div>
  );
}

StackComponent.craft = {
  displayName: 'Stack',
  isCanvas: true,
  props: {
    style: {
      ...userConfiguredStyles,
    },
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: (incomingNodes) =>
      incomingNodes.every((n) => n.data.type === StackItemComponent),
  },
  related: {
    settings: StackComponentSettings,
    extraActions: StackComponentExtraActions,
  },
};
