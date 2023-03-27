import { CSSProperties, useState } from 'react';
import {
  InputNumber,
  InputPicker,
  Panel,
  PanelGroup,
  Stack,
  Tooltip,
  Whisper,
} from 'rsuite';

import { useCommitComponentStyles } from '@/desginer/hooks/useCommitComponentStyles';
import { ExtendedCSSProps } from '@/desginer/types';

interface PositionStyleControlsProps {
  cssProps?: ExtendedCSSProps;
  defaultExpanded: boolean;
}

const positionTypes = ['static', 'relative', 'absolute'].map((p) => ({
  label: p,
  value: p,
}));

const locationUnitOption = [
  { label: 'pixel', value: 'px' },
  { label: 'percentage', value: '%' },
  { label: 'auto', value: 'auto' },
];

export function PositionStyleControls({
  cssProps,
  defaultExpanded,
}: PositionStyleControlsProps) {
  const { commitStyles } = useCommitComponentStyles('cssProps');

  const handlePositionChanged = (v: string) => {
    const nextStyles = {
      ...cssProps,
      position: v as CSSProperties['position'],
    };

    commitStyles(nextStyles);
  };

  const handleLocationValueChange = (
    v: string | number,
    position: 'left' | 'right' | 'top' | 'bottom'
  ) => {
    const unit = cssProps?.positionUnit;

    if (unit === 'auto') {
      return;
    }

    const pos = {
      [position]: `${v}${unit}`,
    };

    const nextStyles: CSSProperties = {
      ...cssProps,
      ...pos,
    };
    commitStyles(nextStyles);
  };

  const [leftValue, setLeftValue] = useState<number>();
  const [rightValue, setRightValue] = useState<number>();
  const [topValue, setTopValue] = useState<number>();
  const [bottomValue, setBottomValue] = useState<number>();

  const handleLocationUnitChange = (v: 'px' | '%' | 'auto') => {
    let pos = {};

    if (v === 'auto') {
      pos = {
        left: 'auto',
        right: 'auto',
        top: 'auto',
        bottom: 'auto',
      };
    } else {
      pos = {
        left: leftValue ? `${leftValue}${v}` : 'auto',
        right: rightValue ? `${rightValue}${v}` : 'auto',
        top: topValue ? `${topValue}${v}` : 'auto',
        bottom: bottomValue ? `${bottomValue}${v}` : 'auto',
      };
    }

    const nextStyles = {
      ...cssProps,
      ...pos,
      positionUnit: v,
    };

    commitStyles(nextStyles);
  };

  return (
    <PanelGroup accordion>
      <Panel header='Position' defaultExpanded={defaultExpanded}>
        <Stack
          direction='column'
          alignItems='stretch'
          className='w-full'
          spacing={20}
        >
          <Stack.Item grow={1}>
            <div className='mb-10'>Type</div>
            <InputPicker
              prefix='postion type'
              size='sm'
              placeholder='position type'
              data={positionTypes}
              defaultValue={cssProps?.position}
              value={cssProps?.position}
              onChange={handlePositionChanged}
              className='w-full'
            />
          </Stack.Item>
          <Stack.Item grow={1}>
            <div className='mb-10'>Location</div>
            <InputPicker
              prefix='width unit'
              size='sm'
              className='w-full mb-10'
              data={locationUnitOption}
              value={cssProps?.positionUnit}
              onChange={handleLocationUnitChange}
            />
            {cssProps?.positionUnit !== 'auto' ? (
              <>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='stretch'
                  spacing={10}
                  className='mb-10'
                >
                  <Stack.Item>
                    <Whisper placement='top' speaker={<Tooltip>Left</Tooltip>}>
                      <div>
                        <InputNumber
                          prefix='L'
                          size='sm'
                          step={0.5}
                          value={leftValue}
                          onChange={(v) => {
                            setLeftValue(Number(v));
                            handleLocationValueChange(v, 'left');
                          }}
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
                          value={rightValue}
                          onChange={(v) => {
                            setRightValue(Number(v));
                            handleLocationValueChange(v, 'right');
                          }}
                        ></InputNumber>
                      </div>
                    </Whisper>
                  </Stack.Item>
                </Stack>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='stretch'
                  spacing={10}
                >
                  <Stack.Item>
                    <Whisper placement='top' speaker={<Tooltip>Top</Tooltip>}>
                      <div>
                        <InputNumber
                          prefix='T'
                          size='sm'
                          step={0.5}
                          value={topValue}
                          onChange={(v) => {
                            setTopValue(Number(v)),
                              handleLocationValueChange(v, 'top');
                          }}
                        ></InputNumber>
                      </div>
                    </Whisper>
                  </Stack.Item>
                  <Stack.Item>
                    <Whisper
                      placement='top'
                      speaker={<Tooltip>Bottom</Tooltip>}
                    >
                      <div>
                        <InputNumber
                          prefix='B'
                          size='sm'
                          step={0.5}
                          value={bottomValue}
                          onChange={(v) => {
                            setBottomValue(Number(v));
                            handleLocationValueChange(v, 'bottom');
                          }}
                        ></InputNumber>
                      </div>
                    </Whisper>
                  </Stack.Item>
                </Stack>
              </>
            ) : null}
          </Stack.Item>
        </Stack>
      </Panel>
    </PanelGroup>
  );
}
