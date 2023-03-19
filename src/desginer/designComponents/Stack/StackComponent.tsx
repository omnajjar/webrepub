import { FreshNode, useEditor, useNode, UserComponent } from '@craftjs/core';
import PlusRoundIcon from '@rsuite/icons/PlusRound';
import { Children, CSSProperties } from 'react';
import { Tooltip, Whisper } from 'rsuite';

import { StackItemComponent } from '@/desginer/designComponents/Stack/StackItemComponent';

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

const requiredStackComponentStyles: CSSProperties = {
  display: 'flex',
};

export const StackComponent: UserComponent<StackComponentProps> = ({
  style,
  children,
  direction,
  ...props
}: StackComponentProps) => {
  const {
    id,
    connectors: { connect, drag },
  } = useNode();

  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const userConfiguredStyles: CSSProperties = {
    flexDirection: direction,
    padding: '8px',
  };

  const addStackItem = () => {
    const freshNode: FreshNode = {
      data: {
        parent: id,
        type: StackItemComponent,
      },
    };

    const node = query.parseFreshNode(freshNode).toNode();
    actions.add(node, id);
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
      {!enabled ? (
        children
      ) : Children.count(children) === 0 ? (
        <AddStackItem addItem={addStackItem} fullWidth={true} />
      ) : (
        <>
          {children}
          <AddStackItem addItem={addStackItem} fullWidth={false} />
        </>
      )}
    </div>
  );
};

function AddStackItem({
  addItem,
  fullWidth,
}: {
  addItem: () => void;
  fullWidth: boolean;
}) {
  return (
    <div
      className={`zig-zag-bg flex flex-col items-center justify-center ${
        fullWidth ? 'w-full' : ''
      }`}
    >
      <Whisper placement='bottom' speaker={<Tooltip>Add item</Tooltip>}>
        <PlusRoundIcon
          onClick={addItem}
          style={{ fontSize: '20px' }}
          className='pointer-cursor color-gray hover-color-darkblue'
        />
      </Whisper>
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
  },
};
