import { useNode } from '@craftjs/core';

import { ColorStyleControls } from '@/desginer/designComponents/Common/ColorStyleControls';
import { ComponentPropsControlsContainer } from '@/desginer/designComponents/Common/ComponentPropsControlsContainer';
import { FlexboxStyleControls } from '@/desginer/designComponents/Common/FlexboxStyleControls';
import { PaddingMarginStyleControls } from '@/desginer/designComponents/Common/PaddingMarginStyleControls';
import { ContainerComponentProps } from '@/desginer/designComponents/Container';

export const ContainerComponentSettings = () => {
  const { style, name } = useNode<
    Partial<ContainerComponentProps> & { name: string }
  >((node) => ({
    style: node.data.props.style,
    name: node.data.displayName,
  }));

  return (
    <ComponentPropsControlsContainer componentName={name}>
      <FlexboxStyleControls style={style} defaultExpanded={true} />
      <ColorStyleControls style={style} defaultExpanded={true} />
      <PaddingMarginStyleControls style={style} defaultExpanded={true} />
    </ComponentPropsControlsContainer>
  );
};
