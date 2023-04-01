import { CSSProperties, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { InputNumber, Panel, PanelGroup, Stack } from 'rsuite';

import { ColorIndicator } from '@/desginer/designComponents/Common/ColorIndicator';
import { useCommitComponentStyles } from '@/desginer/hooks/useCommitComponentStyles';
import { colorToCSSrgba } from '@/desginer/utils/colors';
import { getValueUnit } from '@/desginer/utils/units';

interface BorderStyleControlsProps {
  cssProps?: CSSProperties;
  defaultExpanded: boolean;
}

export function BoxShadowStyleControls({
  cssProps,
  defaultExpanded,
}: BorderStyleControlsProps) {
  const { commitStyles } = useCommitComponentStyles('cssProps');

  const [showShadowColor, setShowShadowColor] = useState(false);
  const toggleShowShadowColor = () => setShowShadowColor(!showShadowColor);

  const [shadowColor, xOffset, yOffset, blur, spread] = (
    cssProps?.boxShadow as string
  ).split(' ');

  const [shadowColorValue, setShadowColorValue] = useState(shadowColor);
  const [xOffsetValue, setXOffsetValue] = useState(getValueUnit(xOffset).value);
  const [yOffsetValue, setYOffsetValue] = useState(getValueUnit(yOffset).value);
  const [blurValue, setBlurValue] = useState(getValueUnit(blur).value);
  const [spreadvalue, setSpreadValue] = useState(getValueUnit(spread).value);

  const composeBoxShdowStyle = () =>
    `${shadowColorValue} ${xOffsetValue}px ${yOffsetValue}px ${blurValue}px ${spreadvalue}px`;

  const handleShadowColorChange = (v: ColorResult) => {
    setShadowColorValue(colorToCSSrgba(v));

    const nextStyles: CSSProperties = {
      ...cssProps,
      boxShadow: composeBoxShdowStyle(),
    };

    commitStyles(nextStyles);
  };

  const handleBoxShadowValueChange = (
    v: number,
    prop: 'xOffset' | 'yOffset' | 'blur' | 'spread'
  ) => {
    switch (prop) {
      case 'xOffset':
        setXOffsetValue(v);
        break;
      case 'yOffset':
        setYOffsetValue(v);
        break;
      case 'blur':
        setBlurValue(v);
        break;
      case 'spread':
        setSpreadValue(v);
        break;
    }

    const nextStyles: CSSProperties = {
      ...cssProps,
      boxShadow: composeBoxShdowStyle(),
    };

    commitStyles(nextStyles);
  };

  return (
    <PanelGroup accordion>
      <Panel header='Box Shadow' defaultExpanded={defaultExpanded}>
        <Stack
          direction='column'
          spacing={20}
          alignItems='stretch'
          className='w-full'
        >
          <Stack.Item grow={1}>
            <>
              <Stack
                justifyContent='space-between'
                alignItems='center'
                onClick={toggleShowShadowColor}
                className='pointer-cursor'
              >
                <Stack.Item>
                  <span>Shadow color</span>
                </Stack.Item>
                <Stack.Item>
                  <ColorIndicator color={shadowColor} />
                </Stack.Item>
              </Stack>
              <Stack direction='column' alignItems='flex-end'>
                {showShadowColor ? (
                  <div className='flex justify-center'>
                    <ChromePicker
                      color={shadowColor}
                      onChange={handleShadowColorChange}
                    />
                  </div>
                ) : null}
              </Stack>
            </>
          </Stack.Item>
          <Stack.Item grow={1}>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='stretch'
              spacing={20}
              className='mb-10'
            >
              <Stack.Item grow={1}>
                <InputNumber
                  prefix='X Offset'
                  size='sm'
                  step={0.5}
                  value={Number(xOffsetValue)}
                  onChange={(v) => {
                    handleBoxShadowValueChange(Number(v), 'xOffset');
                  }}
                />
              </Stack.Item>
              <Stack.Item grow={1}>
                <InputNumber
                  prefix='Y Offset'
                  size='sm'
                  step={0.5}
                  value={Number(yOffsetValue)}
                  onChange={(v) => {
                    handleBoxShadowValueChange(Number(v), 'yOffset');
                  }}
                />
              </Stack.Item>
            </Stack>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='stretch'
              spacing={20}
              className='mb-10'
            >
              <Stack.Item grow={1} className='w-full'>
                <InputNumber
                  prefix='Blur'
                  size='sm'
                  min={0}
                  step={0.5}
                  value={Number(blurValue)}
                  onChange={(v) => {
                    handleBoxShadowValueChange(Number(v), 'blur');
                  }}
                />
              </Stack.Item>
              <Stack.Item grow={1} className='w-full'>
                <InputNumber
                  prefix='Spread'
                  size='sm'
                  min={0}
                  step={0.5}
                  value={Number(spreadvalue)}
                  onChange={(v) => {
                    handleBoxShadowValueChange(Number(v), 'spread');
                  }}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
      </Panel>
    </PanelGroup>
  );
}
