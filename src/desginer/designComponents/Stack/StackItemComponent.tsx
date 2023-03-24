import { useNode, UserComponent } from '@craftjs/core';
import { CSSProperties } from 'react';

import { StackComponent } from '@/desginer/designComponents/Stack/StackComponent';
import { StackItemComponentSettings } from '@/desginer/designComponents/Stack/StackItemComponentSettings';

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
  return (
    <div className='empty-container-bg empty-container-size flex items-center justify-center'>
      <span>Stack Item content</span>
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
  related: {
    settings: StackItemComponentSettings,
  },
};
