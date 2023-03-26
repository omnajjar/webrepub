import { CSSProperties, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import {
  InputNumber,
  InputPicker,
  Panel,
  PanelGroup,
  Stack,
  Tooltip,
  Whisper,
} from 'rsuite';

import { ColorIndicator } from '@/desginer/designComponents/Common/ColorIndicator';
import { useCommitComponentStyles } from '@/desginer/hooks/useCommitComponentStyles';
import { colorToCSSrgba } from '@/desginer/utils/colors';
import { getValueUnit } from '@/desginer/utils/units';

interface BorderStyleControlsProps {
  cssProps?: CSSProperties;
  defaultExpanded: boolean;
}

const borderStyleOptions = [
  'dashed',
  'dotted',
  'double',
  'groove',
  'hidden',
  'inset',
  'none',
  'outset',
  'ridge',
  'solid',
].map((s) => ({
  label: s,
  value: s,
}));

const borderWidthOption = [
  { label: 'pixel', value: 'px' },
  { label: 'percentage', value: '%' },
];

export function BorderStyleControls({
  cssProps,
  defaultExpanded,
}: BorderStyleControlsProps) {
  const { commitStyles } = useCommitComponentStyles('cssProps');
  const [bordersWidthUnit, setBorderWidthUnit] = useState(
    getValueUnit((cssProps?.borderLeftWidth as string) ?? 'px').shorthand
  );

  const handleBorderStyleChange = (v: string) => {
    const nextStyles = {
      ...cssProps,
      borderStyle: v,
    };
    commitStyles(nextStyles);
  };

  const handleBorderWidthChange = (
    v: string | number,
    position: 'Top' | 'Bottom' | 'Left' | 'Right'
  ) => {
    const borderWidthKey = `border${position}Width`;

    const nextStyles: CSSProperties = {
      ...cssProps,
      [borderWidthKey]: `${v}${bordersWidthUnit}`,
    };
    commitStyles(nextStyles);
  };

  const [showBorderColor, setShowBorderColor] = useState(false);
  const toggleBordersColor = () => setShowBorderColor(!showBorderColor);

  const handleBorderColorChange = (v: ColorResult) => {
    const nextStyles = {
      ...cssProps,
      borderColor: colorToCSSrgba(v),
    };

    commitStyles(nextStyles);
  };

  return (
    <PanelGroup accordion>
      <Panel header='Borders' defaultExpanded={defaultExpanded}>
        <Stack
          direction='column'
          spacing={20}
          alignItems='stretch'
          className='w-full'
        >
          <Stack.Item grow={1}>
            <div className='mb-10'>Borders style</div>
            <InputPicker
              prefix='Style'
              size='sm'
              placeholder='border style'
              data={borderStyleOptions}
              defaultValue={cssProps?.borderStyle}
              value={cssProps?.borderStyle}
              onChange={handleBorderStyleChange}
              className='w-full'
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <div className='mb-10'>Borders Width</div>
            <Stack className='mb-10' alignItems='stretch'>
              <Stack.Item grow={1}>
                <InputPicker
                  prefix='width unit'
                  size='sm'
                  className='w-full'
                  data={borderWidthOption}
                  value={bordersWidthUnit}
                  onChange={(v) => {
                    setBorderWidthUnit(v);
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
              <Stack.Item>
                <Whisper placement='top' speaker={<Tooltip>Left</Tooltip>}>
                  <div>
                    <InputNumber
                      prefix='L'
                      size='sm'
                      step={0.5}
                      value={
                        getValueUnit(cssProps?.borderLeftWidth as string).value
                      }
                      onChange={(v) => handleBorderWidthChange(v, 'Left')}
                    ></InputNumber>
                  </div>
                </Whisper>
              </Stack.Item>
              <Stack.Item>
                <Whisper placement='top' speaker={<Tooltip>Right</Tooltip>}>
                  <div>
                    <InputNumber
                      prefix='R'
                      size='sm'
                      step={0.5}
                      value={
                        getValueUnit(cssProps?.borderRightWidth as string).value
                      }
                      onChange={(v) => handleBorderWidthChange(v, 'Right')}
                    ></InputNumber>
                  </div>
                </Whisper>
              </Stack.Item>
            </Stack>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='stretch'
              spacing={20}
            >
              <Stack.Item>
                <Whisper placement='top' speaker={<Tooltip>Top</Tooltip>}>
                  <div>
                    <InputNumber
                      prefix='T'
                      size='sm'
                      step={0.5}
                      value={
                        getValueUnit(cssProps?.borderTopWidth as string).value
                      }
                      onChange={(v) => handleBorderWidthChange(v, 'Top')}
                    ></InputNumber>
                  </div>
                </Whisper>
              </Stack.Item>
              <Stack.Item>
                <Whisper placement='top' speaker={<Tooltip>Bottom</Tooltip>}>
                  <div>
                    <InputNumber
                      prefix='B'
                      size='sm'
                      step={0.5}
                      value={
                        getValueUnit(cssProps?.borderBottomWidth as string)
                          .value
                      }
                      onChange={(v) => handleBorderWidthChange(v, 'Bottom')}
                    ></InputNumber>
                  </div>
                </Whisper>
              </Stack.Item>
            </Stack>
          </Stack.Item>
          <Stack.Item grow={1}>
            <>
              <Stack
                justifyContent='space-between'
                alignItems='center'
                onClick={toggleBordersColor}
                className='pointer-cursor'
              >
                <Stack.Item>
                  <span>Borders color</span>
                </Stack.Item>
                <Stack.Item>
                  <ColorIndicator color={cssProps?.borderColor as string} />
                </Stack.Item>
              </Stack>
              <Stack direction='column' alignItems='flex-end'>
                {showBorderColor ? (
                  <div className='flex justify-center'>
                    <ChromePicker
                      color={cssProps?.borderColor}
                      onChange={handleBorderColorChange}
                    />
                  </div>
                ) : null}
              </Stack>
            </>
          </Stack.Item>
        </Stack>
      </Panel>
    </PanelGroup>
  );
}
