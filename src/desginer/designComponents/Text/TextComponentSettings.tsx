import { useNode } from '@craftjs/core';
import { CSSProperties, useState } from 'react';
import {
  InputNumber,
  Panel,
  PanelGroup,
  Radio,
  RadioGroup,
  Stack,
} from 'rsuite';

import {
  FlexboxStyleProps,
  PaddingMarginStyleProps,
} from '@/desginer/designComponents/Common';
import { ColorStyleProps } from '@/desginer/designComponents/Common/ColorStyleProps';
import { TextComponentProps } from '@/desginer/designComponents/Text/TextComponent';

export const TextComponentSettings = () => {
  const {
    actions: { setProp },
    style,
  } = useNode<Partial<TextComponentProps>>((node) => ({
    style: node.data.props.style,
  }));

  const [textAlignValue, setTextAlignValue] = useState(style?.textAlign);

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
    <>
      <FlexboxStyleProps style={style} defaultExpanded={true} asFlexItem />
      <PanelGroup accordion>
        <Panel header='Font' defaultExpanded>
          <Stack
            direction='row'
            spacing={20}
            alignItems='center'
            justifyContent='center'
          >
            <Stack.Item grow={1}>
              <InputNumber
                prefix='Size'
                min={0}
                max={1000}
                value={Number(style?.fontSize?.toString().replace('px', ''))}
                onChange={(value) => {
                  handleFontSizeChanged(Number(value));
                }}
              />
            </Stack.Item>
          </Stack>
        </Panel>
        <ColorStyleProps defaultExpanded={true} style={style} />
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
      <PaddingMarginStyleProps style={style} defaultExpanded={true} />
    </>
  );
};
