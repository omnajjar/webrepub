import { useNode } from '@craftjs/core';

import { ColorStyleControls } from '@/desginer/designComponents/Common/ColorStyleControls';
import { ComponentPropsControlsContainer } from '@/desginer/designComponents/Common/ComponentPropsControlsContainer';
import { FlexboxStyleControls } from '@/desginer/designComponents/Common/FlexboxStyleControls';
import { PaddingMarginStyleControls } from '@/desginer/designComponents/Common/PaddingMarginStyleControls';
import { StackItemComponentProps } from '@/desginer/designComponents/Stack/StackItemComponent';

export const StackItemComponentSettings = () => {
  const { cssProps, name } = useNode<
    Partial<StackItemComponentProps> & { name: string }
  >((node) => ({
    cssProps: node.data.props.cssProps,
    name: node.data.displayName,
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
        allowControls={['bg']}
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
