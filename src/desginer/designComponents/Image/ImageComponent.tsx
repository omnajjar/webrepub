import { useNode, UserComponent } from '@craftjs/core';
import { CSSProperties } from 'react';
import styled, { css, CSSObject } from 'styled-components';

import { ImageComponentSettings } from '@/desginer/designComponents/Image/ImageComponentSettings';

import PlaceHolderImage from '~/images/img-placeholder.png';

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
  backgroundColor: '#ffffff0',

  flexGrow: 0,

  borderStyle: 'solid',

  borderColor: '#000',

  borderLeftWidth: '0px',
  borderRightWidth: '0px',
  borderTopWidth: '0px',
  borderBottomWidth: '0px',

  borderTopLeftRadius: '0px',
  borderTopRightRadius: '0px',
  borderBottomLeftRadius: '0px',
  borderBottomRightRadius: '0px',

  boxShadow: 'rgba(0,0,0,1) 0px 0px 0px 0px',

  height: '100px',
  width: '100px',
};

const userConfiguredStyles = css<ImageComponentProps>`
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

  border-style: ${(props) => props.cssProps?.borderStyle};

  border-color: ${(props) => props.cssProps?.borderColor};

  border-left-width: ${(props) => props.cssProps?.borderLeftWidth};
  border-right-width: ${(props) => props.cssProps?.borderRightWidth};
  border-top-width: ${(props) => props.cssProps?.borderTopWidth};
  border-bottom-width: ${(props) => props.cssProps?.borderBottomWidth};

  border-top-left-radius: ${(props) => props.cssProps?.borderTopLeftRadius};
  border-top-right-radius: ${(props) => props.cssProps?.borderTopRightRadius};
  border-bottom-left-radius: ${(props) =>
    props.cssProps?.borderBottomLeftRadius};
  border-bottom-right-radius: ${(props) =>
    props.cssProps?.borderBottomRightRadius};

  box-shadow: ${(props) => props.cssProps?.boxShadow};

  height: ${(props) => props.cssProps?.height};
  width: ${(props) => props.cssProps?.width};
`;

const Image = styled.img`
  ${userConfiguredStyles}
`;

export interface ImageComponentProps
  extends React.HTMLAttributes<HTMLImageElement> {
  src?: string;
  cssProps?: CSSProperties;
}

export const ImageComponent: UserComponent<ImageComponentProps> = ({
  src,
  ...props
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <Image
      alt='image'
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      src={src ?? PlaceHolderImage.src}
      {...props}
    ></Image>
  );
};

ImageComponent.craft = {
  displayName: 'Image',
  rules: {
    canDrag: () => true,
  },
  props: {
    cssProps: {
      ...defaultConfiguredStyles,
    },
  },
  related: {
    settings: ImageComponentSettings,
  },
};
