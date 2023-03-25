import { CSSProperties, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { BsCircleFill } from 'react-icons/bs';
import { Panel, PanelGroup, Stack } from 'rsuite';

import { useCommitComponentStyles } from '@/desginer/hooks/useCommitComponentStyles';
import { colorToCSSrgba } from '@/desginer/utils/colors';

interface ColorStyleProps {
  style?: CSSProperties;
  defaultExpanded: boolean;
}

const colorIconStyle: CSSProperties = {
  fontSize: '20px',
  marginTop: '5px',
};

export function ColorStyleProps({ style, defaultExpanded }: ColorStyleProps) {
  const [styles, setStyles] = useState(style ?? {});
  const { commitStyles } = useCommitComponentStyles();

  const [showTextColor, setShowTextColor] = useState(false);
  const toggleTextColor = () => setShowTextColor(!showTextColor);

  const [showBgColor, setShowBgColor] = useState(false);
  const toggleBgColor = () => setShowBgColor(!showBgColor);

  const handleColorChange = (
    styleKey: keyof Pick<CSSProperties, 'color' | 'backgroundColor'>,
    v: ColorResult
  ) => {
    const nextStyles = {
      ...styles,
      [styleKey]: colorToCSSrgba(v),
    } as CSSProperties;

    setStyles(nextStyles);
    commitStyles(nextStyles);
  };

  return (
    <PanelGroup accordion>
      <Panel header='Colors' defaultExpanded={defaultExpanded}>
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
                color: styles.color,
              }}
            />
          </Stack.Item>
        </Stack>
        <Stack direction='column' alignItems='flex-end'>
          {showTextColor ? (
            <div className='flex justify-center'>
              <ChromePicker
                color={styles.color}
                onChange={(colorValue) =>
                  handleColorChange('color', colorValue)
                }
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
                color: styles.backgroundColor,
              }}
            />
          </Stack.Item>
        </Stack>
        <Stack direction='column' alignItems='flex-end'>
          {showBgColor ? (
            <div className='flex justify-center'>
              <ChromePicker
                color={styles.backgroundColor}
                onChange={(colorValue) =>
                  handleColorChange('backgroundColor', colorValue)
                }
              />
            </div>
          ) : null}
        </Stack>
      </Panel>
    </PanelGroup>
  );
}
