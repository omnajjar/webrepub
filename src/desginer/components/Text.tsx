import { useNode, UserComponent } from '@craftjs/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { useEffect, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import ContentEditable from 'react-contenteditable';
import { BsCircleFill } from 'react-icons/bs';
import {
  InputNumber,
  Panel,
  PanelGroup,
  Placeholder,
  Slider,
  Stack,
} from 'rsuite';

import { colorToCSSrgba } from '@/desginer/utils';
import { ensure } from '@/utils';

interface TextComponentProps
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
          ...props.style,
        }}
      />
    </div>
  );
};

const colorIconStyle: CSSProperties = {
  fontSize: '20px',
  marginTop: '5px',
};

const TextComponentSettings = () => {
  const {
    actions: { setProp },
    style,
    textColor,
    bgColor,
  } = useNode<Partial<TextComponentProps>>((node) => ({
    style: node.data.props.style,
    textColor: node.data.props.textColor,
    bgColor: node.data.props.bgColor,
  }));

  const [showTextColor, setShowTextColor] = useState(false);
  const toggleTextColor = () => setShowTextColor(!showTextColor);

  const [showBgColor, setShowBgColor] = useState(false);
  const toggleBgColor = () => setShowBgColor(!showBgColor);

  const handleTextColorChange = (color: ColorResult) => {
    setProp((props: Pick<TextComponentProps, 'textColor'>) => {
      props.textColor = color;
    });
  };

  const handleBGColorChange = (color: ColorResult) => {
    setProp((props: Pick<TextComponentProps, 'bgColor'>) => {
      props.bgColor = color;
    });
  };

  const handleFontSizeChanged = (fontSize: number | number[]) => {
    setProp((props: Pick<TextComponentProps, 'style'>) => {
      if (!props.style) {
        props.style = {};
      }
      props.style.fontSize = fontSize.toString() + 'px';
    });
  };

  return (
    <PanelGroup accordion>
      <Panel header='Font' defaultExpanded>
        <span>Size</span>
        <Stack
          direction='row'
          spacing={20}
          alignItems='center'
          justifyContent='center'
        >
          <Stack.Item grow={1}>
            <Slider
              progress
              min={6}
              max={100}
              value={Number(style?.fontSize?.toString().replace('px', ''))}
              onChange={(value) => {
                handleFontSizeChanged(Number(value));
              }}
            />
          </Stack.Item>
          <Stack.Item basis={70}>
            <InputNumber
              min={6}
              max={100}
              value={Number(style?.fontSize?.toString().replace('px', ''))}
              onChange={(value) => {
                handleFontSizeChanged(Number(value));
              }}
            />
          </Stack.Item>
        </Stack>
      </Panel>
      <Panel header='Colors' defaultExpanded>
        <Stack justifyContent='space-between' alignItems='center'>
          <Stack.Item>
            <span>Text color</span>
          </Stack.Item>
          <Stack.Item>
            <BsCircleFill
              className='pointer-cursor'
              onClick={toggleTextColor}
              style={{
                ...colorIconStyle,
                color: colorToCSSrgba(ensure(textColor)),
              }}
            />
          </Stack.Item>
        </Stack>
        <Stack direction='column' alignItems='flex-end'>
          {showTextColor ? (
            <div className='flex justify-center'>
              <ChromePicker
                color={textColor?.rgb}
                onChange={handleTextColorChange}
              />
            </div>
          ) : null}
        </Stack>
        <Stack justifyContent='space-between' alignItems='center'>
          <Stack.Item>
            <span>Background color</span>
          </Stack.Item>
          <Stack.Item>
            <BsCircleFill
              className='pointer-cursor'
              onClick={toggleBgColor}
              style={{
                ...colorIconStyle,
                color: colorToCSSrgba(ensure(bgColor)),
              }}
            />
          </Stack.Item>
        </Stack>
        <Stack direction='column' alignItems='flex-end'>
          {showBgColor ? (
            <div className='flex justify-center'>
              <ChromePicker
                color={bgColor?.rgb}
                onChange={handleBGColorChange}
              />
            </div>
          ) : null}
        </Stack>
      </Panel>
      <Panel header='Alignment' defaultExpanded>
        <Placeholder.Paragraph />
      </Panel>
    </PanelGroup>
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
    },
  },
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: TextComponentSettings,
  },
};
