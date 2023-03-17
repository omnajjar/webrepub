import { useNode, UserComponent } from '@craftjs/core';
import { CSSProperties } from 'react';

type WebPageComponentProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
  'is'
>;

const defaultWebPageComponentComponentStyles: CSSProperties = {
  minHeight: '842px',
  width: '595px',
  background: '#fff',
};

export const WebPageComponent: UserComponent<WebPageComponentProps> = ({
  children,
  style,
  ...props
}: WebPageComponentProps) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <main
      style={{ ...defaultWebPageComponentComponentStyles, ...style }}
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
