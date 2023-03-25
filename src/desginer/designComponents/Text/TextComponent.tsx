import { useNode, UserComponent } from '@craftjs/core';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';

import { TextComponentSettings } from '@/desginer/designComponents/Text/TextComponentSettings';

export interface TextComponentProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  text: string;
}

const userConfiguredStyles: CSSProperties = {
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

  flexGrow: 0,
};

export const TextComponent: UserComponent<TextComponentProps> = ({
  text,
  ...props
}: TextComponentProps) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
    hasSelectedNode,
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (hasSelectedNode) {
      setEditable(true);
      return;
    }

    setEditable(false);
  }, [hasSelectedNode]);

  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ref && ref.current) {
      connect(drag(ref.current));
    }
  }, [connect, drag]);

  return (
    <ContentEditable
      innerRef={ref}
      html={text}
      disabled={!editable}
      onChange={(e) =>
        setProp(
          (props: Pick<TextComponentProps, 'text'>) =>
            (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, ''))
        )
      }
      tagName='p'
      style={{
        ...userConfiguredStyles,
        borderRadios: '0px',
        outline: 'none',
        ...props.style,
      }}
    />
  );
};

TextComponent.craft = {
  displayName: 'Text',
  props: {
    text: 'Text',
    style: {
      ...userConfiguredStyles,
    },
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: TextComponentSettings,
  },
};
