import { useNode, UserComponent } from '@craftjs/core';
import { CSSProperties, useEffect, useState } from 'react';
import styled, { css, CSSObject } from 'styled-components';

import { WebPageComponentSettings } from '@/desginer/designComponents/WebPage/WebPageComponentSettings';

const defaultConfiguredStyles: CSSObject = {
  backgroundColor: '#fff',
};

export interface WebPageComponentProps
  extends React.HTMLAttributes<HTMLElement> {
  cssProps?: CSSProperties;
}

const userConfiguredStyles = css<WebPageComponentProps>`
  background-color: ${(props) => props.cssProps?.backgroundColor};
`;

const Main = styled.main`
  ${userConfiguredStyles}

  /* global styles */
  width: 100%;
  overflow: auto;
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

  useEffect(() => {
    if (!window) {
      return;
    }

    // we need to set a fixed height to the design view port so that it can be scrollable.
    setIntialHeight(`${window.innerHeight - 56 - 30 * 2}px`); // 56px is the header height, 30px is the padding of the container
  }, []);

  return (
    <Main
      {...props}
      style={{
        ...style,
        minHeight: initialHeigh,
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
