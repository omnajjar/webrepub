import { CSSProperties, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { Panel, PanelGroup, Stack } from 'rsuite';

import { ColorIndicator } from '@/desginer/designComponents/Common/ColorIndicator';
import { useCommitComponentStyles } from '@/desginer/hooks/useCommitComponentStyles';
import { colorToCSSrgba } from '@/desginer/utils/colors';

interface ColorStyleControlsProps {
  cssProps?: CSSProperties;
  defaultExpanded: boolean;
  allowControls?: ('bg' | 'color')[];
}

export function ColorStyleControls({
  cssProps: style,
  defaultExpanded,
  allowControls = ['bg', 'color'],
}: ColorStyleControlsProps) {
  const [styles, setStyles] = useState(style ?? {});
  const { commitStyles } = useCommitComponentStyles('cssProps');

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
        {allowControls.includes('color') ? (
          <>
            <Stack
              justifyContent='space-between'
              alignItems='center'
              onClick={toggleTextColor}
              className='pointer-cursor'
            >
              <Stack.Item>
                <span>Text color</span>
              </Stack.Item>
              <Stack.Item>
                <ColorIndicator color={styles.color as string} />
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
          </>
        ) : null}
        {allowControls.includes('bg') ? (
          <>
            <Stack
              justifyContent='space-between'
              alignItems='center'
              onClick={toggleBgColor}
              className='pointer-cursor'
            >
              <Stack.Item>
                <span>Background color</span>
              </Stack.Item>
              <Stack.Item>
                <ColorIndicator color={styles.backgroundColor as string} />
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
          </>
        ) : null}
      </Panel>
    </PanelGroup>
  );
}
