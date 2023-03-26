import { useEditor, useNode, UserComponent } from '@craftjs/core';
import { CSSProperties } from 'react';
import styled, { css, CSSObject } from 'styled-components';

import { LinkComponentSettings } from '@/desginer/designComponents/Link/LinkComponentSettings';

const defaultConfiguredStyles: CSSObject = {
  paddingLeft: '8px',
  paddingRight: '8px',
  paddingTop: '8px',
  paddingBottom: '8px',

  marginLeft: '0px',
  marginRight: '0px',
  marginTop: '0px',
  marginBottom: '0px',

  color: '#fff',
  backgroundColor: '#000',

  flexGrow: 0,
};

const userConfiguredStyles = css<LinkComponentProps>`
  padding-left: ${(props) => props.cssProps?.paddingLeft};
  padding-right: ${(props) => props.cssProps?.paddingRight};
  padding-top: ${(props) => props.cssProps?.paddingTop};
  padding-bottom: ${(props) => props.cssProps?.paddingBottom};

  margin-left: ${(props) => props.cssProps?.marginLeft};
  margin-right: ${(props) => props.cssProps?.marginRight};
  margin-top: ${(props) => props.cssProps?.marginTop};
  margin-bottom: ${(props) => props.cssProps?.marginBottom};

  color: ${(props) => props.cssProps?.color};
  background-color: ${(props) => props.cssProps?.backgroundColor};

  flex-grow: ${(props) => props.cssProps?.flexGrow};
`;

const Link = styled.a`
  ${defaultConfiguredStyles}
  ${userConfiguredStyles}


  /* global styles */
  display: inline-block;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

export interface LinkComponentProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  caption?: string;
  cssProps?: CSSProperties;
}

export const LinkComponent: UserComponent<LinkComponentProps> = ({
  href,
  caption,
  ...props
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <Link
      onClick={(e) => {
        if (enabled) {
          e.preventDefault();
        }
      }}
      href={href}
      target='_blank'
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      {...props}
    >
      {caption}
    </Link>
  );
};

LinkComponent.craft = {
  displayName: 'Link',
  rules: {
    canDrag: () => true,
  },
  props: {
    cssProps: {
      ...defaultConfiguredStyles,
    },
    caption: 'Link',
  },
  related: {
    settings: LinkComponentSettings,
  },
};
