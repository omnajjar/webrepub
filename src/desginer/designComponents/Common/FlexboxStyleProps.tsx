import { CSSProperties, useState } from 'react';
import { Panel, PanelGroup, Radio, RadioGroup, Stack } from 'rsuite';
import { ValueType } from 'rsuite/esm/Checkbox';

import { StackComponentProps } from '@/desginer/designComponents/Stack';

interface FlexboxStyleProps {
  style?: CSSProperties;
  setElementProp: (cb: unknown, throttleRate?: number) => void;
  defaultExpanded: boolean;
}

const defaultFlexboxStyles: CSSProperties = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
};

export function FlexboxStyleProps({
  style,
  setElementProp,
  defaultExpanded,
}: FlexboxStyleProps) {
  const [styles, setStyles] = useState(style ?? defaultFlexboxStyles);

  const commitStyles = (stylesToCommit: CSSProperties) =>
    setElementProp((props: Pick<StackComponentProps, 'style'>) => {
      props.style = stylesToCommit;
    });

  const handleFlexDirectionChange = (v: ValueType) => {
    const nextStyles = {
      ...styles,
      flexDirection: v,
    } as CSSProperties;

    setStyles(nextStyles);
    commitStyles(nextStyles);
  };

  const handleJustifyContentChange = (v: ValueType) => {
    const nextStyles = {
      ...styles,
      justifyContent: v,
    } as CSSProperties;

    setStyles(nextStyles);
    commitStyles(nextStyles);
  };

  const handleAlignItemsChange = (v: ValueType) => {
    const nextStyles = {
      ...styles,
      alignItems: v,
    } as CSSProperties;

    setStyles(nextStyles);
    commitStyles(nextStyles);
  };

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
      </Panel>
    </PanelGroup>
  );
}
