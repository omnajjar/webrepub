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
