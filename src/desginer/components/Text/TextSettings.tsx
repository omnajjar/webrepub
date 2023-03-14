import { useNode } from '@craftjs/core';
import { CSSProperties, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { BsCircleFill } from 'react-icons/bs';
import {
  InputNumber,
  Panel,
  PanelGroup,
  Radio,
  RadioGroup,
  Slider,
  Stack,
} from 'rsuite';

import { TextComponentProps } from '@/desginer/components/Text/Text';
import { colorToCSSrgba } from '@/desginer/utils';
import { ensure } from '@/utils';

const colorIconStyle: CSSProperties = {
  fontSize: '20px',
  marginTop: '5px',
};

export const TextComponentSettings = () => {
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

  const [textAlignValue, setTextAlignValue] = useState(style?.textAlign);

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

  const handleTextAlignChanged = (value: CSSProperties['textAlign']) => {
    setProp((props: Pick<TextComponentProps, 'style'>) => {
      if (!props.style) {
        props.style = {};
      }
      setTextAlignValue(value);
      props.style.textAlign = value;
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
          <Stack.Item basis='70px'>
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
        <span>Text align</span>
        <RadioGroup
          name='radioList'
          inline
          value={textAlignValue}
          onChange={(v) => {
            handleTextAlignChanged(v as CSSProperties['textAlign']);
          }}
        >
          <Radio value='left'>Left</Radio>
          <Radio value='center'>Center</Radio>
          <Radio value='right'>Right</Radio>
        </RadioGroup>
      </Panel>
    </PanelGroup>
  );
};
