import { useNode } from '@craftjs/core';

import { ComponentPropsControlsContainer } from '@/desginer/designComponents/Common/ComponentPropsControlsContainer';
import { ColorStyleControls } from '@/desginer/designComponents/Common/PropsControls/ColorStyleControls';
import { FlexboxStyleControls } from '@/desginer/designComponents/Common/PropsControls/FlexboxStyleControls';
import { PaddingMarginStyleControls } from '@/desginer/designComponents/Common/PropsControls/PaddingMarginStyleControls';
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
