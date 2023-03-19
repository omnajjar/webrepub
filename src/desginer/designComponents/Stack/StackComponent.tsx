import { FreshNode, useEditor, useNode, UserComponent } from '@craftjs/core';
import PlusRoundIcon from '@rsuite/icons/PlusRound';
import {
  Children,
  CSSProperties,
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react';
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

  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stackDom = stackRef.current;
    if (stackDom) {
      connect(drag(stackDom));
    }
  }, [connect, drag]);

  const MainStackComponent: FC<PropsWithChildren> = ({ children }) => {
    return (
      <div
        style={{
          ...style,
          ...userConfiguredStyles,
          ...requiredStackComponentStyles,
        }}
        {...props}
        ref={stackRef}
      >
        {children}
      </div>
    );
  };

  if (!enabled) {
    return <MainStackComponent>{children}</MainStackComponent>;
  }

  Children.count(children);

  return (
    <MainStackComponent>
      {Children.count(children) === 0 ? (
        <AddStackItem addItem={addStackItem} fullWidth={true} />
      ) : (
        <>
          {children}
          <AddStackItem addItem={addStackItem} fullWidth={false} />
        </>
      )}
    </MainStackComponent>
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
