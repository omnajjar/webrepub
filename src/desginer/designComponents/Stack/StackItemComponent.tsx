import { useNode, UserComponent } from '@craftjs/core';
import { CSSProperties } from 'react';

import { StackComponent } from '@/desginer/designComponents/Stack/StackComponent';

interface StackItemComponentProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    'is'
  > {
  span: CSSProperties['flex'];
}

const requiredStackItemComponentStyles: CSSProperties = {};

export const StackItemComponent: UserComponent<StackItemComponentProps> = ({
  children,
  style,
  span,
  ...props
}: StackItemComponentProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const userConfiguredStyles: CSSProperties = { flex: span };

  return (
    <div
      custom-foo={Date.now()}
      style={{
        ...style,
        ...userConfiguredStyles,
        ...requiredStackItemComponentStyles,
      }}
      {...props}
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
    >
      {children ? children : <EmptyStackItemContent></EmptyStackItemContent>}
    </div>
  );
};

const EmptyStackItemContent = () => {
  const emptyContainerStyles: CSSProperties = {
    color: 'black',
    textAlign: 'center',
    padding: '15px',
    border: '2px dashed lightgray',
  };
  return (
    <div style={emptyContainerStyles} className='foo'>
      Stack Item
    </div>
  );
};

StackItemComponent.craft = {
  displayName: 'Stack Item',
  isCanvas: true,
  props: {
    span: 1,
  },
  rules: {
    canDrag: () => true,
    canDrop: (dropTarget) => dropTarget.data.type === StackComponent,
  },
};
