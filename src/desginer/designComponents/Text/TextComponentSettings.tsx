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

import { ComponentPropsControlsContainer } from '@/desginer/designComponents/Common/ComponentPropsControlsContainer';
import { BorderStyleControls } from '@/desginer/designComponents/Common/PropsControls/BorderStyleControls';
import { ColorStyleControls } from '@/desginer/designComponents/Common/PropsControls/ColorStyleControls';
import { FlexboxStyleControls } from '@/desginer/designComponents/Common/PropsControls/FlexboxStyleControls';
import { PaddingMarginStyleControls } from '@/desginer/designComponents/Common/PropsControls/PaddingMarginStyleControls';
import { TextComponentProps } from '@/desginer/designComponents/Text/TextComponent';

export const TextComponentSettings = () => {
  const {
    actions: { setProp },
    cssProps,
    name,
  } = useNode<Partial<TextComponentProps> & { name: string }>((node) => ({
    cssProps: node.data.props.cssProps,
    name: node.data.displayName,
  }));

  const [textAlignValue, setTextAlignValue] = useState(cssProps?.textAlign);

  const handleFontSizeChanged = (fontSize: number | number[]) => {
    setProp((props: Pick<TextComponentProps, 'cssProps'>) => {
      if (props.cssProps) {
        props.cssProps.fontSize = fontSize.toString() + 'px';
      }
    });
  };

  const handleTextAlignChanged = (value: CSSProperties['textAlign']) => {
    setProp((props: Pick<TextComponentProps, 'cssProps'>) => {
      if (props.cssProps) {
        props.cssProps.textAlign = value;
      }
      setTextAlignValue(value);
    });
  };

  return (
    <ComponentPropsControlsContainer componentName={name}>
      <FlexboxStyleControls
        cssProps={cssProps}
        defaultExpanded={true}
        asFlexItem
      />
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
                value={Number(cssProps?.fontSize?.toString().replace('px', ''))}
                onChange={(value) => {
                  handleFontSizeChanged(Number(value));
                }}
              />
            </Stack.Item>
          </Stack>
        </Panel>
        <ColorStyleControls defaultExpanded={true} cssProps={cssProps} />
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
      <BorderStyleControls cssProps={cssProps} defaultExpanded={true} />
      <PaddingMarginStyleControls cssProps={cssProps} defaultExpanded={true} />
    </ComponentPropsControlsContainer>
  );
};
