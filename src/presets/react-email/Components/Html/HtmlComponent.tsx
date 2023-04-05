import { useEditor, useNode, UserComponent } from '@craftjs/core';
import { Html, HtmlProps } from '@react-email/html';
import { CSSProperties } from 'react';

import { useGlobalSettings } from '@/desginer/Providers/GlobalSettings';
import { HtmlComponentSettings } from '@/presets/react-email/Components/Html/HtmlComponentSettings';

const defaultConfiguredStyles: CSSProperties = {
  backgroundColor: '#fff',
};

export interface HtmlComponentProps extends HtmlProps {
  previwe: boolean;
}

export const HTMLComponent: UserComponent<HtmlComponentProps> = ({
  children,
  style,
  ...props
}: HtmlComponentProps) => {
  const {
    connectors: { connect },
  } = useNode();
  const { enabled: _enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const {
    settings: { isInDesignMode: _isInDesignMode },
  } = useGlobalSettings();

  return (
    <Html
      {...props}
      style={{
        ...style,
      }}
      ref={(ref) => {
        if (ref) {
          connect(ref);
        }
      }}
    >
      {children}
    </Html>
  );
};

HTMLComponent.craft = {
  displayName: 'Html',
  isCanvas: true,
  props: {
    style: {
      ...defaultConfiguredStyles,
    },
  },
  rules: {
    canMoveIn: () => true,
    canDrag: () => false,
  },
  related: {
    settings: HtmlComponentSettings,
  },
};
