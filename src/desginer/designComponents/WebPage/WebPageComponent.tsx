import { useEditor, useNode, UserComponent } from '@craftjs/core';
import { CSSProperties, useEffect, useState } from 'react';
import styled, { css, CSSObject } from 'styled-components';

import { WebPageComponentSettings } from '@/desginer/designComponents/WebPage/WebPageComponentSettings';
import { useGlobalSettings } from '@/desginer/Providers/GlobalSettings';

const defaultConfiguredStyles: CSSObject = {
  backgroundColor: '#fff',
};

export interface WebPageComponentProps
  extends React.HTMLAttributes<HTMLElement> {
  cssProps?: CSSProperties;
  previwe: boolean;
}

const userConfiguredStyles = css<WebPageComponentProps>`
  background-color: ${(props) => props.cssProps?.backgroundColor};
  height: ${(props) => (props.previwe ? '100vh' : 0)};
`;

const Main = styled.main`
  ${userConfiguredStyles}

  /* global styles */
  width: 100%;
  overflow: auto;
  position: relative;
`;

export const WebPageComponent: UserComponent<WebPageComponentProps> = ({
  children,
  style,
  ...props
}: WebPageComponentProps) => {
  const {
    connectors: { connect },
  } = useNode();
  const [initialHeigh, setIntialHeight] = useState('100%');
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const {
    settings: { isInDesignMode },
  } = useGlobalSettings();

  useEffect(() => {
    if (!window) {
      return;
    }

    if (enabled && isInDesignMode) {
      // we need to set a fixed height to the design view port so that it can be scrollable.
      setIntialHeight(`${window.innerHeight - 56 - 30 * 2}px`); // 56px is the header height, 30px is the padding of the container
    }
  }, [enabled, isInDesignMode]);

  const designTimeStyleProps: Partial<CSSProperties> =
    enabled || isInDesignMode ? { minHeight: initialHeigh } : {};

  return (
    <Main
      {...props}
      previwe={!isInDesignMode}
      style={{
        ...style,
        ...designTimeStyleProps,
      }}
      ref={(ref) => {
        if (ref) {
          connect(ref);
        }
      }}
    >
      {children}
    </Main>
  );
};

WebPageComponent.craft = {
  displayName: 'Web page',
  isCanvas: true,
  props: {
    cssProps: {
      ...defaultConfiguredStyles,
    },
  },
  rules: {
    canMoveIn: () => true,
    canDrag: () => false,
  },
  related: {
    settings: WebPageComponentSettings,
  },
};
