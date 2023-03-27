import { useNode } from '@craftjs/core';

import { ComponentPropsControlsContainer } from '@/desginer/designComponents/Common/ComponentPropsControlsContainer';
import { BorderStyleControls } from '@/desginer/designComponents/Common/PropsControls/BorderStyleControls';
import { BoxShadowStyleControls } from '@/desginer/designComponents/Common/PropsControls/BoxShadowStyleControls';
import { ColorStyleControls } from '@/desginer/designComponents/Common/PropsControls/ColorStyleControls';
import { FlexboxStyleControls } from '@/desginer/designComponents/Common/PropsControls/FlexboxStyleControls';
import { PaddingMarginStyleControls } from '@/desginer/designComponents/Common/PropsControls/PaddingMarginStyleControls';
import { StackComponentProps } from '@/desginer/designComponents/Stack';

export const StackComponentSettings = () => {
  const { cssProps, name } = useNode<
    Partial<StackComponentProps> & { name: string }
  >((node) => ({
    cssProps: node.data.props.cssProps,
    name: node.data.displayName,
  }));

  return (
    <ComponentPropsControlsContainer componentName={name}>
      <FlexboxStyleControls cssProps={cssProps} defaultExpanded={true} />
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
