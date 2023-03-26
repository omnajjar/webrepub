import { useNode } from '@craftjs/core';

import { ComponentPropsControlsContainer } from '@/desginer/designComponents/Common/ComponentPropsControlsContainer';
import { ColorStyleControls } from '@/desginer/designComponents/Common/PropsControls/ColorStyleControls';
import { FlexboxStyleControls } from '@/desginer/designComponents/Common/PropsControls/FlexboxStyleControls';
import { PaddingMarginStyleControls } from '@/desginer/designComponents/Common/PropsControls/PaddingMarginStyleControls';
import { ContainerComponentProps } from '@/desginer/designComponents/Container';

export const ContainerComponentSettings = () => {
  const { name, cssProps } = useNode<
    Partial<ContainerComponentProps> & { name: string }
  >((node) => ({
    name: node.data.displayName,
    cssProps: node.data.props.cssProps,
  }));

  return (
    <ComponentPropsControlsContainer componentName={name}>
      <FlexboxStyleControls cssProps={cssProps} defaultExpanded={true} />
      <ColorStyleControls
        cssProps={cssProps}
        defaultExpanded={true}
        allowControls={['bg']}
      />
      <PaddingMarginStyleControls cssProps={cssProps} defaultExpanded={true} />
    </ComponentPropsControlsContainer>
  );
};
