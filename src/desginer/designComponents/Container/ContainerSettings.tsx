import { useNode } from '@craftjs/core';

import { ColorStyleControls } from '@/desginer/designComponents/Common/ColorStyleControls';
import { ComponentPropsControlsContainer } from '@/desginer/designComponents/Common/ComponentPropsControlsContainer';
import { FlexboxStyleControls } from '@/desginer/designComponents/Common/FlexboxStyleControls';
import { PaddingMarginStyleControls } from '@/desginer/designComponents/Common/PaddingMarginStyleControls';
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
      <PaddingMarginStyleControls
        cssProps={cssProps}
        defaultExpanded={true}
        useStyledComponents
      />
    </ComponentPropsControlsContainer>
  );
};
