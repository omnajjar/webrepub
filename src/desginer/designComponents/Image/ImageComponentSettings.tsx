import { useNode } from '@craftjs/core';
import { useState } from 'react';
import {
  InputNumber,
  Panel,
  PanelGroup,
  Radio,
  RadioGroup,
  Stack,
  Uploader,
} from 'rsuite';
import { ValueType } from 'rsuite/esm/Radio';

import { ComponentPropsControlsContainer } from '@/desginer/designComponents/Common/ComponentPropsControlsContainer';
import { BorderStyleControls } from '@/desginer/designComponents/Common/PropsControls/BorderStyleControls';
import { BoxShadowStyleControls } from '@/desginer/designComponents/Common/PropsControls/BoxShadowStyleControls';
import { ColorStyleControls } from '@/desginer/designComponents/Common/PropsControls/ColorStyleControls';
import { FlexboxStyleControls } from '@/desginer/designComponents/Common/PropsControls/FlexboxStyleControls';
import { PaddingMarginStyleControls } from '@/desginer/designComponents/Common/PropsControls/PaddingMarginStyleControls';
import { ImageComponentProps } from '@/desginer/designComponents/Image/ImageComponent';
import { useCommitComponentStyles } from '@/desginer/hooks/useCommitComponentStyles';
import { getValueUnit } from '@/desginer/utils/units';

import PlaceHolderImage from '~/images/img-placeholder.png';

export const ImageComponentSettings = () => {
  const { name, cssProps } = useNode<
    Partial<ImageComponentProps> & { name: string }
  >((node) => ({
    name: node.data.displayName,
    cssProps: node.data.props.cssProps,
  }));

  return (
    <ComponentPropsControlsContainer componentName={name}>
      <ImageSettings defaultExpanded={true} />
      <FlexboxStyleControls
        cssProps={cssProps}
        defaultExpanded={true}
        asFlexItem
      />
      <ColorStyleControls
        cssProps={cssProps}
        defaultExpanded={true}
        allowControls={['bg']}
      />
      <BorderStyleControls cssProps={cssProps} defaultExpanded={true} />
      <PaddingMarginStyleControls cssProps={cssProps} defaultExpanded={true} />
      <BoxShadowStyleControls cssProps={cssProps} defaultExpanded={true} />
    </ComponentPropsControlsContainer>
  );
};

function ImageSettings({ defaultExpanded }: { defaultExpanded: boolean }) {
  const {
    actions: { setProp },
    cssProps,
  } = useNode<Partial<ImageComponentProps>>((node) => ({
    cssProps: node.data.props.cssProps,
  }));

  const { commitStyles } = useCommitComponentStyles('cssProps');

  const setImageSrc = (src: string) => {
    setProp((props: Pick<ImageComponentProps, 'src'>) => {
      props.src = src;
    });
  };

  const [heightValue, setHeightValue] = useState(
    getValueUnit(cssProps?.height).value
  );
  const [widthValue, setWidthValue] = useState(
    getValueUnit(cssProps?.width).value
  );

  const handleUnitChange = (unit: ValueType, dimension: 'width' | 'height') => {
    if (unit === 'auto') {
      commitStyles({
        ...cssProps,
        [dimension]: unit,
      });
    } else {
      commitStyles({
        ...cssProps,
        [dimension]: `${
          dimension === 'width' ? widthValue : heightValue
        }${unit}`,
      });
    }
  };

  return (
    <PanelGroup accordion>
      <Panel header='Image' defaultExpanded={defaultExpanded}>
        <Stack direction='column' alignItems='stretch' className='w-full'>
          <Stack.Item>
            <div className='mb-10'>Source</div>
            <Uploader
              style={{ maxWidth: '320px' }}
              draggable
              accept='.png, .jpg, .jpeg'
              shouldUpload={() => false}
              action=''
              name='image'
              onChange={(fileList) => {
                const file = fileList[0];

                if (file && file.blobFile) {
                  const fileName = file.name
                    ? `${file.name.substring(0, 10)}...`
                    : 'image';
                  file.name = fileName;
                  const fileUrl = URL.createObjectURL(file.blobFile);
                  setImageSrc(fileUrl);
                } else {
                  setImageSrc(PlaceHolderImage.src);
                }
              }}
            >
              <div
                style={{
                  height: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                className='mx-20'
              >
                <span>Click or Drag files to this area to upload</span>
              </div>
            </Uploader>
          </Stack.Item>
          <Stack.Item>
            <div className='mb-10'>Dimensions</div>
            <div className='mb-10'>
              <span>Height</span>
              <RadioGroup
                name='height'
                inline
                onChange={(v) => handleUnitChange(v, 'height')}
                value={getValueUnit(cssProps?.height).shorthand}
              >
                <Radio value='auto'>auto</Radio>
                <Radio value='px'>pixel</Radio>
                <Radio value='%'>percentage</Radio>
              </RadioGroup>
              <InputNumber
                prefix='height'
                size='sm'
                step={0.5}
                value={heightValue}
                disabled={getValueUnit(cssProps?.height).shorthand === 'auto'}
                onChange={(v) => {
                  setHeightValue(Number(v));
                  commitStyles({
                    ...cssProps,
                    height: `${v}${getValueUnit(cssProps?.height).shorthand}`,
                  });
                }}
              ></InputNumber>
            </div>
            <div className='mb-10'>
              <span>Width</span>
              <RadioGroup
                name='width'
                inline
                onChange={(v) => handleUnitChange(v, 'width')}
                value={getValueUnit(cssProps?.width).shorthand}
              >
                <Radio value='auto'>auto</Radio>
                <Radio value='px'>pixel</Radio>
                <Radio value='%'>percentage</Radio>
              </RadioGroup>
              <InputNumber
                prefix='width'
                size='sm'
                step={0.5}
                value={widthValue}
                disabled={getValueUnit(cssProps?.width).shorthand === 'auto'}
                onChange={(v) => {
                  setWidthValue(Number(v));
                  commitStyles({
                    ...cssProps,
                    width: `${v}${getValueUnit(cssProps?.width).shorthand}`,
                  });
                }}
              ></InputNumber>
            </div>
          </Stack.Item>
        </Stack>
      </Panel>
    </PanelGroup>
  );
}
