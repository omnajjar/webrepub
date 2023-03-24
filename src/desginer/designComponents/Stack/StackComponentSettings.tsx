import { useNode } from '@craftjs/core';

import {
  FlexboxStyleProps,
  PaddingMarginStyleProps,
} from '@/desginer/designComponents/Common';
import { StackComponentProps } from '@/desginer/designComponents/Stack';

export const StackComponentSettings = () => {
  const { style } = useNode<Partial<StackComponentProps>>((node) => ({
    style: node.data.props.style,
  }));

  return (
    <>
      <FlexboxStyleProps style={style} defaultExpanded={true} />
      <PaddingMarginStyleProps style={style} defaultExpanded={true} />
    </>
  );
};
