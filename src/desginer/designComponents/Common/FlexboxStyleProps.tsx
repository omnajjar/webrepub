import { CSSProperties, useState } from 'react';
import {
  Divider,
  InputNumber,
  InputPicker,
  Panel,
  PanelGroup,
  Radio,
  RadioGroup,
  Stack,
} from 'rsuite';
import { ValueType } from 'rsuite/esm/Checkbox';

import { useCommitComponentStyles } from '@/desginer/hooks/useCommitComponentStyles';

interface FlexboxStyleProps {
  style?: CSSProperties;
  defaultExpanded: boolean;
}

const flexGapUnits = [
  { label: 'pixel', value: 'px' },
  { label: 'percentage', value: '%' },
];

export function FlexboxStyleProps({
  style,
  defaultExpanded,
}: FlexboxStyleProps) {
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

  const handleFlexDirectionChange = (v: ValueType) =>
    handleStyleChange('flexDirection', v);
  const handleJustifyContentChange = (v: ValueType) =>
    handleStyleChange('justifyContent', v);
  const handleAlignItemsChange = (v: ValueType) =>
    handleStyleChange('alignItems', v);
  const handleGrowChnage = (v: ValueType) => handleStyleChange('flexGrow', v);

  const [rowGapUnit, setRowGapUnit] = useState('px');
  const handleRowGapChange = (v: ValueType) =>
    handleStyleChange('rowGap', `${v}${rowGapUnit}`);

  const [columnGapUnit, setColumnGapUnit] = useState('px');
  const handleColumnGapChange = (v: ValueType) =>
    handleStyleChange('columnGap', `${v}${columnGapUnit}`);

  return (
    <PanelGroup accordion>
      <Panel header='Flex' defaultExpanded={defaultExpanded}>
        <div>
          <span>Direction</span>
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
          <span>Justify Content</span>
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
          <span>Align Items</span>
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
          <Stack
            direction='column'
            spacing={20}
            alignItems='stretch'
            justifyContent='flex-start'
          >
            <Stack.Item grow={1}>
              <InputNumber
                prefix='Grow'
                size='sm'
                onChange={handleGrowChnage}
                min={0}
                value={styles.flexGrow}
              ></InputNumber>
            </Stack.Item>
            <Stack spacing={10}>
              <Stack.Item grow={1}>
                <InputNumber
                  prefix='Row gap'
                  size='sm'
                  onChange={handleRowGapChange}
                  min={0}
                  value={styles.rowGap
                    ?.toString()
                    .replace(rowGapUnit ?? '', '')}
                ></InputNumber>
              </Stack.Item>
              <Stack.Item grow={1}>
                <InputPicker
                  placeholder='unit'
                  data={flexGapUnits}
                  defaultValue={rowGapUnit ?? 'px'}
                  onChange={(v) => setRowGapUnit(v)}
                />
              </Stack.Item>
            </Stack>
            <Stack spacing={10}>
              <Stack.Item grow={1}>
                <InputNumber
                  prefix='Column gap'
                  size='sm'
                  onChange={handleColumnGapChange}
                  min={0}
                  value={styles.columnGap
                    ?.toString()
                    .replace(columnGapUnit ?? '', '')}
                ></InputNumber>
              </Stack.Item>
              <Stack.Item grow={1}>
                <InputPicker
                  placeholder='unit'
                  data={flexGapUnits}
                  defaultValue={columnGapUnit ?? 'px'}
                  onChange={(v) => setColumnGapUnit(v)}
                />
              </Stack.Item>
            </Stack>
          </Stack>
        </div>
      </Panel>
    </PanelGroup>
  );
}
