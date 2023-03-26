import { useNode } from '@craftjs/core';

import { ColorStyleControls } from '@/desginer/designComponents/Common/ColorStyleControls';
import { ComponentPropsControlsContainer } from '@/desginer/designComponents/Common/ComponentPropsControlsContainer';
import { FlexboxStyleControls } from '@/desginer/designComponents/Common/FlexboxStyleControls';
import { PaddingMarginStyleControls } from '@/desginer/designComponents/Common/PaddingMarginStyleControls';
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
      <PaddingMarginStyleControls
        cssProps={cssProps}
        defaultExpanded={true}
        useStyledComponents
      />
    </ComponentPropsControlsContainer>
  );
};
