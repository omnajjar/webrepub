import { useNode } from '@craftjs/core';
import {
  Popover,
  PopoverContent,
  PopoverHandler,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from '@material-tailwind/react';
import { Slider } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import ContentEditable from 'react-contenteditable';

import { colorToCSSrgba } from '@/desginer/utils';
import { ensure } from '@/utils';

import { CraftExtention, NodeType } from '@/types';

interface TextComponentProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  text: string;
  textColor: ColorResult;
  bgColor: ColorResult;
}

export const TextComponent = ({
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
          background: colorToCSSrgba(bgColor),
          color: colorToCSSrgba(textColor),
          ...props.style,
        }}
      />
    </div>
  );
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
    <Tabs value='font'>
      <TabsHeader className='w-full rounded-none'>
        <Tab value='font'>Font</Tab>
        <Tab value='alignment'>Alignment</Tab>
      </TabsHeader>
      <TabsBody>
        <TabPanel value='font' className='w-full'>
          <div className='mb-2'>
            <Typography
              variant='small'
              color='blue-gray'
              className='mb-2 flex flex-row items-center justify-between font-medium'
            >
              <span>Font size </span>
              <span className='w-14 rounded-md bg-indigo-700 py-1 px-2 text-center text-white'>
                {style?.fontSize}
              </span>
            </Typography>
            <Slider
              value={Number(style?.fontSize?.toString().replace('px', ''))}
              min={8}
              step={1}
              max={250}
              onChange={(_, value) => {
                handleFontSizeChanged(value);
              }}
            />
          </div>
          <div className='mb-2'>
            <Typography
              variant='small'
              color='blue-gray'
              className='mb-4 flex flex-row items-center justify-between font-medium'
            >
              <span>Color</span>
              <Popover>
                <PopoverHandler>
                  <span
                    className='block h-6 w-6 cursor-pointer rounded-full shadow'
                    style={{ background: colorToCSSrgba(ensure(textColor)) }}
                  ></span>
                </PopoverHandler>
                <PopoverContent className='rounded-none p-0'>
                  <ChromePicker
                    color={textColor?.rgb}
                    onChange={handleTextColorChange}
                  />
                </PopoverContent>
              </Popover>
            </Typography>
          </div>
          <div className='mb-2'>
            <Typography
              variant='small'
              color='blue-gray'
              className='mb-2 flex flex-row items-center justify-between font-medium'
            >
              <span>Background color</span>
              <Popover>
                <PopoverHandler>
                  <span
                    className='block h-6 w-6 cursor-pointer rounded-full shadow'
                    style={{ background: colorToCSSrgba(ensure(bgColor)) }}
                  ></span>
                </PopoverHandler>
                <PopoverContent className='rounded-none p-0'>
                  <ChromePicker
                    color={bgColor?.rgb}
                    onChange={handleBGColorChange}
                  />
                </PopoverContent>
              </Popover>
            </Typography>
          </div>
        </TabPanel>
      </TabsBody>
    </Tabs>
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

const TextComponentExtention: CraftExtention<TextComponentProps> = {
  props: {
    text: 'Hi',
    textColor: defaultTextColor,
    bgColor: defaultBgColor,
    style: {
      fontSize: '14px',
    },
  },
  rules: {
    canDrag: (_node: NodeType<TextComponentProps>) => true,
  },
  related: {
    settings: TextComponentSettings,
  },
};

TextComponent.craft = TextComponentExtention;
