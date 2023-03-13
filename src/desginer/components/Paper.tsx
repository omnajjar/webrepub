import { useEditor, useNode, UserComponent } from '@craftjs/core';
import { CSSProperties, useEffect, useState } from 'react';

type PaperComponentProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
  'is'
>;

const defaultPaperComponentStyles: CSSProperties = {
  minHeight: '842px',
  width: '595px',
  background: '#fff',
};

export const PaperComponent: UserComponent<PaperComponentProps> = ({
  children,
  ...props
}: PaperComponentProps) => {
  const {
    connectors: { connect },
  } = useNode();
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [styles, setStyles] = useState(defaultPaperComponentStyles);

  useEffect(() => {
    const nextStyles = {
      ...defaultPaperComponentStyles,
      ...(enabled ? { marginBottom: '15px' } : {}),
    };
    setStyles(nextStyles);
  }, [enabled]);

  return (
    <section
      style={styles}
      {...props}
      ref={(ref) => {
        if (ref) {
          connect(ref);
        }
      }}
    >
      {children}
    </section>
  );
};

PaperComponent.craft = {
  isCanvas: true,
  rules: {
    canMoveIn: () => true,
  },
};
