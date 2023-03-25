import { useNode } from '@craftjs/core';

import {
  FlexboxStyleProps,
  PaddingMarginStyleProps,
} from '@/desginer/designComponents/Common';
import { ColorStyleProps } from '@/desginer/designComponents/Common/ColorStyleProps';
import { StackComponentProps } from '@/desginer/designComponents/Stack';

export const StackComponentSettings = () => {
  const { style } = useNode<Partial<StackComponentProps>>((node) => ({
    style: node.data.props.style,
  }));

  return (
    <>
      <FlexboxStyleProps style={style} defaultExpanded={true} />
      <ColorStyleProps style={style} defaultExpanded={true} />
      <PaddingMarginStyleProps style={style} defaultExpanded={true} />
    </>
  );
};
