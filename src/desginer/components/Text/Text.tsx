import { useNode, UserComponent } from '@craftjs/core';
import { useEffect, useState } from 'react';
import { ColorResult } from 'react-color';
import ContentEditable from 'react-contenteditable';

import { TextComponentSettings } from '@/desginer/components/Text/TextSettings';
import { colorToCSSrgba } from '@/desginer/utils/colors';
import { ensure } from '@/utils';

export interface TextComponentProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  text: string;
  textColor?: ColorResult;
  bgColor?: ColorResult;
}

export const TextComponent: UserComponent<TextComponentProps> = ({
  text,
  textColor,
  bgColor,
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
          color: colorToCSSrgba(ensure(textColor)),
          background: colorToCSSrgba(ensure(bgColor)),
          textAlign: 'left',
          outline: 'none',
          ...props.style,
        }}
      />
    </div>
  );
};

const defaultTextColor: ColorResult = {
  hex: '#333',
  rgb: {
    r: 51,
    g: 51,
    b: 51,
    a: 1,
  },
  hsl: {
    h: 0,
    s: 0,
    l: 0.2,
    a: 1,
  },
};

const defaultBgColor: ColorResult = {
  hex: '#fff',
  rgb: {
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  },
  hsl: {
    h: 0,
    s: 0,
    l: 0,
    a: 1,
  },
};

TextComponent.craft = {
  props: {
    text: 'Hi',
    textColor: defaultTextColor,
    bgColor: defaultBgColor,
    style: {
      fontSize: '14px',
      textAlign: 'left',
    },
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: TextComponentSettings,
  },
};
