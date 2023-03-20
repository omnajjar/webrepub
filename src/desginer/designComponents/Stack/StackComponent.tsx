import { useEditor, useNode, UserComponent } from '@craftjs/core';
import { Children, CSSProperties } from 'react';

import { StackItemComponent } from '@/desginer/designComponents/Stack';
import { StackComponentExtraActions } from '@/desginer/designComponents/Stack/StackComponentExtraActions';

interface StackComponentProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    'is'
  > {
  direction?: CSSProperties['flexDirection'];
}

export const StackComponent: UserComponent<StackComponentProps> = ({
  style,
  children,
  direction,
  ...props
}: StackComponentProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const requiredStackComponentStyles: CSSProperties = {
    display: 'flex',
  };

  const userConfiguredStyles: CSSProperties = {
    flexDirection: direction,
    padding: '8px',
    gap: '5px',
  };

  return (
    <div
      style={{
        ...style,
        ...userConfiguredStyles,
        ...requiredStackComponentStyles,
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
      <span>Content</span>
    </div>
  );
}

StackComponent.craft = {
  displayName: 'Stack container',
  isCanvas: true,
  props: {
    direction: 'row',
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: (incomingNodes) =>
      incomingNodes.every((n) => n.data.type === StackItemComponent),
  },
  related: {
    extraActions: StackComponentExtraActions,
  },
};
