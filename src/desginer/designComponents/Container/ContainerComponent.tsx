import { useNode, UserComponent } from '@craftjs/core';
import { CSSProperties } from 'react';

type ContainerComponentProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'is'
>;

const defaultContainerComponentStyles: CSSProperties = {
  padding: '8px',
};

export const ContainerComponent: UserComponent<ContainerComponentProps> = ({
  children,
  ...props
}: ContainerComponentProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      style={defaultContainerComponentStyles}
      {...props}
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
    >
      {children ? children : <EmptyContainerContent></EmptyContainerContent>}
    </div>
  );
};

const EmptyContainerContent = () => {
  const emptyContainerStyles: CSSProperties = {
    color: 'black',
    textAlign: 'center',
    padding: '15px',
    border: '2px dashed lightgray',
  };
  return (
    <div style={emptyContainerStyles}>Drag and drop a component here!</div>
  );
};

ContainerComponent.craft = {
  displayName: 'Container',
  isCanvas: true,
  rules: {
    canMoveIn: () => true,
    canDrag: () => true,
  },
};
