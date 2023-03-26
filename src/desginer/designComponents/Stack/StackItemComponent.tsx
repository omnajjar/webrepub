import { useEditor, useNode, UserComponent } from '@craftjs/core';
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

const requiredStackItemComponentStyles: CSSProperties = {};

export const StackItemComponent: UserComponent<StackItemComponentProps> = ({
  children,
  style,
  ...props
}: StackItemComponentProps) => {
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
        ...requiredStackItemComponentStyles,
        ...style,
      }}
      {...props}
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
    >
      {children ? (
        children
      ) : enabled ? (
        <EmptyStackItemContent></EmptyStackItemContent>
      ) : null}
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
    style: {
      ...userConfiguredStyles,
    },
  },
  rules: {
    canDrag: () => true,
    canDrop: (dropTarget) => dropTarget.data.type === StackComponent,
  },
  related: {
    settings: StackItemComponentSettings,
  },
};
