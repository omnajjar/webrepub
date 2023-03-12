import { useNode } from '@craftjs/core';
import { CSSProperties } from 'react';

type ContainerComponentProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'is'
>;

const defaultContainerComponentStyles: CSSProperties = {
  width: '100%',
  height: '200px',
  color: 'black',
  textAlign: 'center',
  padding: '8px',
};

export const ContainerComponent = ({
  children,
  ...props
}: ContainerComponentProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      style={props.style ? { ...props.style } : defaultContainerComponentStyles}
      {...props}
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
    >
      {children ? children : 'empty container'}
    </div>
  );
};
