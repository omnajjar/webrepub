import { useNode, UserComponent } from '@craftjs/core';
import { useEffect, useState } from 'react';
import ContentEditable from 'react-contenteditable';

import { TextComponentSettings } from '@/desginer/designComponents/Text/TextComponentSettings';

export interface TextComponentProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  text: string;
}

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

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
    >
      <ContentEditable
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
          padding: '8px',
          borderRadios: '0px',
          textAlign: 'left',
          outline: 'none',
          ...props.style,
        }}
      />
    </div>
  );
};

TextComponent.craft = {
  displayName: 'Text',
  props: {
    text: 'Hi',
    style: {
      fontSize: '14px',
      textAlign: 'left',
      color: '#222',
    },
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: TextComponentSettings,
  },
};
