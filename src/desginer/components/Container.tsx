import { useNode } from '@craftjs/core';

type ContainerComponentProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'is'
>;

const defaultContainerComponentProps: ContainerComponentProps = {
  style: {
    // padding: '4px',
    background: 'blue',
    width: '100%',
    height: '200px',
  },
};

export const ContainerComponent = ({
  children,
  ...props
}: ContainerComponentProps = defaultContainerComponentProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      {...props}
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
    >
      {children}
    </div>
  );
};
