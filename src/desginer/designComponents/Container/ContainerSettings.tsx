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
      <FlexboxStyleControls
        style={cssProps}
        defaultExpanded={true}
        useStyledComponents
      />
      <ColorStyleControls
        style={cssProps}
        defaultExpanded={true}
        useStyledComponents
      />
      <PaddingMarginStyleControls
        style={cssProps}
        defaultExpanded={true}
        useStyledComponents
      />
    </ComponentPropsControlsContainer>
  );
};
