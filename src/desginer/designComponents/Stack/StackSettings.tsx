import { useNode } from '@craftjs/core';
import { CSSProperties, useState } from 'react';
import { Panel, PanelGroup, Radio, RadioGroup, Stack } from 'rsuite';
import { ValueType } from 'rsuite/esm/Radio';

import { StackComponentProps } from '@/desginer/designComponents/Stack';

const defaultStackComponentSettings: CSSProperties = {
  flexDirection: 'row',
};

export const StackComponentSettings = () => {
  const {
    actions: { setProp },
    style,
  } = useNode<Partial<StackComponentProps>>((node) => ({
    style: node.data.props.style,
  }));

  const [styles, setStyles] = useState(style ?? defaultStackComponentSettings);

  const commitStyles = (stylesToCommit: CSSProperties) =>
    setProp((props: Pick<StackComponentProps, 'style'>) => {
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

  return (
    <PanelGroup accordion>
      <Panel header='Flex' defaultExpanded>
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
      </Panel>
    </PanelGroup>
  );
};
