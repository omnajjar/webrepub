import { useNode } from '@craftjs/core';

import { ColorStyleControls } from '@/desginer/designComponents/Common/ColorStyleControls';
import { FlexboxStyleControls } from '@/desginer/designComponents/Common/FlexboxStyleControls';
import { PaddingMarginStyleControls } from '@/desginer/designComponents/Common/PaddingMarginStyleControls';
import { StackComponentProps } from '@/desginer/designComponents/Stack';

export const StackComponentSettings = () => {
  const { style } = useNode<Partial<StackComponentProps>>((node) => ({
    style: node.data.props.style,
  }));

  return (
    <>
      <FlexboxStyleControls style={style} defaultExpanded={true} />
      <ColorStyleControls style={style} defaultExpanded={true} />
      <PaddingMarginStyleControls style={style} defaultExpanded={true} />
    </>
  );
};
