import { CSSProperties, useState } from 'react';
import { Divider, InputNumber, Panel, PanelGroup, Stack } from 'rsuite';
import { ValueType } from 'rsuite/esm/Checkbox';

import { useCommitComponentStyles } from '@/desginer/hooks/useCommitComponentStyles';
import { extractPixelUnit } from '@/desginer/utils/elements';

interface PaddingMarginStyleProps {
  style?: CSSProperties;
  defaultExpanded: boolean;
}

type Position = 'Top' | 'Bottom' | 'Left' | 'Right';

export function PaddingMarginStyleProps({
  style,
  defaultExpanded,
}: PaddingMarginStyleProps) {
  const [styles, setStyles] = useState(style ?? {});
  const { commitStyles } = useCommitComponentStyles();

  const handleStyleChange = (styleKey: keyof CSSProperties, v: ValueType) => {
    const nextStyles = {
      ...styles,
      [styleKey]: v,
    } as CSSProperties;

    setStyles(nextStyles);
    commitStyles(nextStyles);
  };

  const handlePaddingChange = (postion: Position, v: ValueType) =>
    handleStyleChange(`padding${postion}`, `${v}px`);

  const handleMarginChange = (postion: Position, v: ValueType) =>
    handleStyleChange(`margin${postion}`, `${v}px`);

  return (
    <PanelGroup accordion>
      <Panel header='Padding & Margin' defaultExpanded={defaultExpanded}>
        <div>
          <div className='mb-10'>Padding</div>
          <Stack direction='column' spacing={10}>
            <Stack.Item grow={1}>
              <Stack
                direction='row'
                justifyContent='space-between'
                spacing={20}
              >
                <Stack.Item grow={1} alignSelf='stretch' className='w-full'>
                  <InputNumber
                    prefix='left'
                    size='sm'
                    step={0.5}
                    min={-1000}
                    value={extractPixelUnit(styles.paddingLeft as string)}
                    onChange={(v) => handlePaddingChange('Left', v)}
                  ></InputNumber>
                </Stack.Item>
                <Stack.Item grow={1} alignSelf='stretch' className='w-full'>
                  <InputNumber
                    prefix='right'
                    size='sm'
                    step={0.5}
                    min={-1000}
                    value={extractPixelUnit(styles.paddingRight as string)}
                    onChange={(v) => handlePaddingChange('Right', v)}
                  ></InputNumber>
                </Stack.Item>
              </Stack>
            </Stack.Item>
            <Stack.Item grow={1}>
              <Stack
                direction='row'
                justifyContent='space-between'
                spacing={20}
              >
                <Stack.Item grow={1} alignSelf='stretch' className='w-full'>
                  <InputNumber
                    prefix='top'
                    size='sm'
                    step={0.5}
                    min={-1000}
                    value={extractPixelUnit(styles.paddingTop as string)}
                    onChange={(v) => handlePaddingChange('Top', v)}
                  ></InputNumber>
                </Stack.Item>
                <Stack.Item grow={1} alignSelf='stretch' className='w-full'>
                  <InputNumber
                    prefix='bottom'
                    size='sm'
                    step={0.5}
                    min={-1000}
                    value={extractPixelUnit(styles.paddingBottom as string)}
                    onChange={(v) => handlePaddingChange('Bottom', v)}
                  ></InputNumber>
                </Stack.Item>
              </Stack>
            </Stack.Item>
          </Stack>
        </div>
        <Divider />
        <div>
          <div className='mb-10'>Margin</div>
          <Stack direction='column' spacing={10}>
            <Stack.Item grow={1}>
              <Stack
                direction='row'
                justifyContent='space-between'
                spacing={20}
              >
                <Stack.Item grow={1} alignSelf='stretch' className='w-full'>
                  <InputNumber
                    prefix='left'
                    size='sm'
                    step={0.5}
                    min={-1000}
                    value={extractPixelUnit(styles.marginLeft as string)}
                    onChange={(v) => handleMarginChange('Left', v)}
                  ></InputNumber>
                </Stack.Item>
                <Stack.Item grow={1} alignSelf='stretch' className='w-full'>
                  <InputNumber
                    prefix='right'
                    size='sm'
                    step={0.5}
                    min={-1000}
                    value={extractPixelUnit(styles.marginRight as string)}
                    onChange={(v) => handleMarginChange('Right', v)}
                  ></InputNumber>
                </Stack.Item>
              </Stack>
            </Stack.Item>
            <Stack.Item grow={1}>
              <Stack
                direction='row'
                justifyContent='space-between'
                spacing={20}
              >
                <Stack.Item grow={1} alignSelf='stretch' className='w-full'>
                  <InputNumber
                    prefix='top'
                    size='sm'
                    step={0.5}
                    min={-1000}
                    value={extractPixelUnit(styles.marginTop as string)}
                    onChange={(v) => handleMarginChange('Top', v)}
                  ></InputNumber>
                </Stack.Item>
                <Stack.Item grow={1} alignSelf='stretch' className='w-full'>
                  <InputNumber
                    prefix='bottom'
                    size='sm'
                    step={0.5}
                    min={-1000}
                    value={extractPixelUnit(styles.marginBottom as string)}
                    onChange={(v) => handleMarginChange('Bottom', v)}
                  ></InputNumber>
                </Stack.Item>
              </Stack>
            </Stack.Item>
          </Stack>
        </div>
      </Panel>
    </PanelGroup>
  );
}
