import { useNode } from '@craftjs/core';
import { StackItemProps } from 'rsuite/esm/Stack/StackItem';

import { FlexboxStyleControls } from '@/desginer/designComponents/Common/FlexboxStyleControls';
import { PaddingMarginStyleControls } from '@/desginer/designComponents/Common/PaddingMarginStyleControls';

export const StackItemComponentSettings = () => {
  const { style } = useNode<Partial<StackItemProps>>((node) => ({
    style: node.data.props.style,
  }));

  return (
    <>
      <FlexboxStyleControls style={style} defaultExpanded={true} />
      <PaddingMarginStyleControls style={style} defaultExpanded={true} />
    </>
  );
};
