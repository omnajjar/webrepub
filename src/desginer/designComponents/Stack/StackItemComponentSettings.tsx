import { useNode } from '@craftjs/core';
import { StackItemProps } from 'rsuite/esm/Stack/StackItem';

import { ComponentPropsControlsContainer } from '@/desginer/designComponents/Common/ComponentPropsControlsContainer';
import { FlexboxStyleControls } from '@/desginer/designComponents/Common/FlexboxStyleControls';
import { PaddingMarginStyleControls } from '@/desginer/designComponents/Common/PaddingMarginStyleControls';

export const StackItemComponentSettings = () => {
  const { style, name } = useNode<Partial<StackItemProps> & { name: string }>(
    (node) => ({
      style: node.data.props.style,
      name: node.data.displayName,
    })
  );

  return (
    <ComponentPropsControlsContainer componentName={name}>
      <FlexboxStyleControls style={style} defaultExpanded={true} />
      <PaddingMarginStyleControls style={style} defaultExpanded={true} />
    </ComponentPropsControlsContainer>
  );
};
