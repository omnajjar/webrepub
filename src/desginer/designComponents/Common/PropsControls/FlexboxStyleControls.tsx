import { CSSProperties, useState } from 'react';
import {
  Divider,
  InputNumber,
  Panel,
  PanelGroup,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
  Whisper,
} from 'rsuite';
import { ValueType } from 'rsuite/esm/Checkbox';

import { useCommitComponentStyles } from '@/desginer/hooks/useCommitComponentStyles';
import { getValueUnit } from '@/desginer/utils/units';

interface FlexboxStyleControlsProps {
  cssProps?: CSSProperties;
  defaultExpanded: boolean;
  asFlexItem?: boolean;
}

export function FlexboxStyleControls({
  cssProps,
  defaultExpanded,
  asFlexItem,
}: FlexboxStyleControlsProps) {
  const [styles, setStyles] = useState(cssProps ?? {});
  const { commitStyles } = useCommitComponentStyles('cssProps');

  const handleStyleChange = (styleKey: keyof CSSProperties, v: ValueType) => {
    const nextStyles = {
      ...styles,
      [styleKey]: v,
    } as CSSProperties;

    setStyles(nextStyles);
    commitStyles(nextStyles);
  };

  const handleFlexDirectionChange = (v: ValueType) =>
    handleStyleChange('flexDirection', v);
  const handleJustifyContentChange = (v: ValueType) =>
    handleStyleChange('justifyContent', v);
  const handleAlignItemsChange = (v: ValueType) =>
    handleStyleChange('alignItems', v);
  const handleGrowChnage = (v: ValueType) => handleStyleChange('flexGrow', v);

  const handleRowGapChange = (v: ValueType) =>
    handleStyleChange('rowGap', `${v}px`);

  const handleColumnGapChange = (v: ValueType) =>
    handleStyleChange('columnGap', `${v}px`);

  const FlexItemControls = () => (
    <PanelGroup accordion>
      <Panel header='Flex Item' defaultExpanded={defaultExpanded}>
        <Stack>
          <Stack.Item grow={1}>
            <InputNumber
              prefix='Grow'
              size='sm'
              onChange={handleGrowChnage}
              min={0}
              value={styles.flexGrow}
            ></InputNumber>
          </Stack.Item>
        </Stack>
      </Panel>
    </PanelGroup>
  );

  const FlexContainerControls = () => (
    <PanelGroup accordion>
      <Panel header='Flex Container' defaultExpanded={defaultExpanded}>
        {asFlexItem ? (
          <FlexItemControls />
        ) : (
          <>
            <div>
              <div>Direction</div>
              <Stack
                direction='row'
                spacing={20}
                alignItems='center'
                justifyContent='center'
              >
                <Stack.Item grow={1}>
                  <RadioGroup
                    name='flex-direction'
                    value={styles.flexDirection}
                    inline
                    onChange={handleFlexDirectionChange}
                  >
                    <Stack>
                      <Stack.Item>
                        <Radio value='row'>Row</Radio>
                        <Radio value='row-reverse'>Row reverse</Radio>
                      </Stack.Item>
                      <Stack.Item>
                        <Radio value='column'>Column</Radio>
                        <Radio value='column-reverse'>Column reverse</Radio>
                      </Stack.Item>
                    </Stack>
                  </RadioGroup>
                </Stack.Item>
              </Stack>
            </div>
            <Divider />
            <div>
              <div>Justify Content</div>
              <Stack
                direction='row'
                spacing={20}
                alignItems='flex-start'
                justifyContent='flex-start'
              >
                <Stack.Item grow={1}>
                  <RadioGroup
                    name='justifyContent'
                    value={styles.justifyContent}
                    inline
                    onChange={handleJustifyContentChange}
                  >
                    <Stack direction='row' alignItems='baseline'>
                      <Stack.Item>
                        <div>
                          <Radio value='flex-start'>Start</Radio>
                          <Radio value='flex-end'>End</Radio>
                          <Radio value='center'>Center</Radio>
                        </div>
                      </Stack.Item>
                      <Stack.Item alignSelf='flex-start'>
                        <div>
                          <Radio value='space-around'>Space around</Radio>
                          <Radio value='space-between'>Space between</Radio>
                        </div>
                      </Stack.Item>
                    </Stack>
                  </RadioGroup>
                </Stack.Item>
              </Stack>
            </div>
            <Divider />
            <div>
              <div>Align Items</div>
              <Stack
                direction='row'
                spacing={20}
                alignItems='flex-start'
                justifyContent='flex-start'
              >
                <Stack.Item>
                  <RadioGroup
                    name='alignItems'
                    value={styles.alignItems}
                    inline
                    onChange={handleAlignItemsChange}
                  >
                    <Stack direction='row' alignItems='baseline'>
                      <Stack.Item>
                        <Stack direction='column'>
                          <Stack.Item alignSelf='flex-start'>
                            <Radio value='flex-start'>Start</Radio>
                            <div>
                              <Radio value='flex-end'>End</Radio>
                              <Radio value='center'>Center</Radio>
                            </div>
                          </Stack.Item>
                        </Stack>
                      </Stack.Item>
                      <Stack.Item>
                        <Stack direction='column'>
                          <Stack.Item>
                            <div>
                              <Radio value='stretch'>Stretch</Radio>
                              <Radio value='baseline'>Baseline</Radio>
                            </div>
                          </Stack.Item>
                        </Stack>
                      </Stack.Item>
                    </Stack>
                  </RadioGroup>
                </Stack.Item>
              </Stack>
            </div>
            <Divider />
            <div>
              <div className='mb-10'>Flex Gap</div>
              <Stack
                direction='column'
                spacing={20}
                alignItems='stretch'
                justifyContent='flex-start'
              >
                <Stack spacing={10}>
                  <Stack.Item grow={1} className='w-full'>
                    <Whisper
                      placement='top'
                      speaker={<Tooltip>Row Gap</Tooltip>}
                    >
                      <InputNumber
                        prefix='R Gap'
                        size='sm'
                        onChange={handleRowGapChange}
                        min={0}
                        value={getValueUnit(styles.rowGap as string).value}
                      ></InputNumber>
                    </Whisper>
                  </Stack.Item>
                </Stack>
                <Stack spacing={10}>
                  <Stack.Item grow={1} className='w-full'>
                    <Whisper
                      placement='top'
                      speaker={<Tooltip>Column Gap</Tooltip>}
                    >
                      <InputNumber
                        prefix='C Gap'
                        size='sm'
                        onChange={handleColumnGapChange}
                        min={0}
                        value={getValueUnit(styles.columnGap as string).value}
                      ></InputNumber>
                    </Whisper>
                  </Stack.Item>
                </Stack>
              </Stack>
            </div>
          </>
        )}
      </Panel>
    </PanelGroup>
  );

  if (asFlexItem) {
    return <FlexItemControls />;
  }

  return (
    <>
      <FlexContainerControls />
      <FlexItemControls />
    </>
  );
}
