import { useNode } from '@craftjs/core';
import { StackItemProps } from 'rsuite/esm/Stack/StackItem';

import { ColorStyleControls } from '@/desginer/designComponents/Common/ColorStyleControls';
import { ComponentPropsControlsContainer } from '@/desginer/designComponents/Common/ComponentPropsControlsContainer';

export const WebPageComponentSettings = () => {
  const { style, name } = useNode<Partial<StackItemProps> & { name: string }>(
    (node) => ({
      style: node.data.props.style,
      name: node.data.displayName,
    })
  );

  return (
    <ComponentPropsControlsContainer componentName={name}>
      <ColorStyleControls style={style} defaultExpanded={true} />
    </ComponentPropsControlsContainer>
  );
};
