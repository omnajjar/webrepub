import { useNode, UserComponent } from '@craftjs/core';

import { PaperComponent } from '@/desginer/components/Paper';

type DocumentComponentProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
  'is'
>;

export const DocumentComponent: UserComponent<DocumentComponentProps> = ({
  children,
  ...props
}: DocumentComponentProps) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <main
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

DocumentComponent.craft = {
  isCanvas: true,
  rules: {
    canMoveIn: (inComingNode) =>
      inComingNode.every((n) => n.data.type === PaperComponent),
  },
};
