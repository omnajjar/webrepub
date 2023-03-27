import { useEditor, useNode, UserComponent } from '@craftjs/core';
import { CSSProperties, useEffect, useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import styled, { css, CSSObject } from 'styled-components';

import { TextComponentSettings } from '@/desginer/designComponents/Text/TextComponentSettings';
import { sanitizeValue } from '@/desginer/utils/strings';

const defaultConfiguredStyles: CSSObject = {
  paddingTop: '8px',
  paddingBottom: '8px',
  paddingLeft: '8px',
  paddingRight: '8px',

  marginTop: '0px',
  marginBottom: '0px',
  marginLeft: '0px',
  marginRight: '0px',

  textAlign: 'left',

  fontSize: '14px',

  color: '#000',
  backgroundColor: '#ffffff00',

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
};

const resets: CSSObject = {
  outline: 'none',
  borderRadius: '0px',
};

const userConfiguredStyles = css<TextComponentProps>`
  padding-left: ${(props) => props.cssProps?.paddingLeft};
  padding-right: ${(props) => props.cssProps?.paddingRight};
  padding-top: ${(props) => props.cssProps?.paddingTop};
  padding-bottom: ${(props) => props.cssProps?.paddingBottom};

  margin-left: ${(props) => props.cssProps?.marginLeft};
  margin-right: ${(props) => props.cssProps?.marginRight};
  margin-top: ${(props) => props.cssProps?.marginTop};
  margin-bottom: ${(props) => props.cssProps?.marginBottom};

  text-align: ${(props) => props.cssProps?.textAlign};

  font-size: ${(props) => props.cssProps?.fontSize};

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
`;

const Text = styled.p`
  ${userConfiguredStyles}
  ${resets}
`;

export interface TextComponentProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  text?: string;
  cssProps?: CSSProperties;
}

export const TextComponent: UserComponent<TextComponentProps> = ({
  text,
  cssProps,
  ...props
}: TextComponentProps) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
    hasSelectedNode,
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
  }));

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (ref && ref.current) {
      connect(drag(ref.current));
    }
  }, [connect, drag]);

  if (!enabled) {
    return (
      <Text
        contentEditable={hasSelectedNode && enabled}
        dangerouslySetInnerHTML={{ __html: text ?? '' }}
        {...props}
        cssProps={cssProps}
      />
    );
  }

  return (
    <ContentEditable
      innerRef={ref}
      html={text ?? ''}
      disabled={!hasSelectedNode}
      onChange={(e) =>
        setProp(
          (props: Pick<TextComponentProps, 'text'>) =>
            (props.text = sanitizeValue(e.target.value))
        )
      }
      tagName='p'
      style={cssProps}
    />
  );
};

TextComponent.craft = {
  displayName: 'Text',
  props: {
    text: 'Text',
    cssProps: {
      ...defaultConfiguredStyles,
      ...resets,
    },
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: TextComponentSettings,
  },
};
