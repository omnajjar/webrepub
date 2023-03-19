import { useNode, UserComponent } from '@craftjs/core';
import { CSSProperties, useEffect, useState } from 'react';

type WebPageComponentProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
  'is'
>;

const defaultWebPageComponentComponentStyles: CSSProperties = {
  width: '100%',
  background: '#fff',
  overflow: 'auto',
};

export const WebPageComponent: UserComponent<WebPageComponentProps> = ({
  children,
  style,
  ...props
}: WebPageComponentProps) => {
  const {
    connectors: { connect },
  } = useNode();

  const [initialHeigh, setIntialHeight] = useState('100%');

  useEffect(() => {
    if (!window) {
      return;
    }

    // we need to set a fixed height to the design view port so that it can be scrollable.
    setIntialHeight(`${window.innerHeight - 56 - 30 * 2}px`); // 56px is the header height, 30px is the padding of the container
  }, []);

  return (
    <main
      style={{
        ...defaultWebPageComponentComponentStyles,
        minHeight: initialHeigh,
        ...style,
      }}
      {...props}
      ref={(ref) => {
        if (ref) {
          connect(ref);
        }
      }}
    >
      {children}
    </main>
  );
};

WebPageComponent.craft = {
  isCanvas: true,
  rules: {
    canMoveIn: (_incomingNode) => true,
    canDrag: () => false,
  },
};
