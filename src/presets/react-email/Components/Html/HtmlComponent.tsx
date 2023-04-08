import { useNode } from '@craftjs/core';
import { Html, HtmlProps } from '@react-email/html';
import { CSSProperties } from 'react';
import { BsFiletypeHtml } from 'react-icons/bs';

import { useWebrepub } from '@/desginer/Providers/webrepub';
import { WebrepubComponent } from '@/desginer/types/webrepub';
import { HtmlComponentSettings } from '@/presets/react-email/Components/Html/HtmlComponentSettings';

const defaultConfiguredStyles: CSSProperties = {
  backgroundColor: '#fff',
};

export interface HtmlComponentProps extends HtmlProps {
  previwe: boolean;
}

export const HTMLComponent: WebrepubComponent<HtmlComponentProps> = ({
  children,
  style,
  ...props
}: HtmlComponentProps) => {
  const {
    connectors: { connect },
  } = useNode();

  const {
    settings: { isInDesignMode: _isInDesignMode },
  } = useWebrepub();

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

HTMLComponent.icon = BsFiletypeHtml;
