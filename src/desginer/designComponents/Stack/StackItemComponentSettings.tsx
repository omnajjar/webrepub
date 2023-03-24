import { useNode } from '@craftjs/core';
import { StackItemProps } from 'rsuite/esm/Stack/StackItem';

import {
  FlexboxStyleProps,
  PaddingMarginStyleProps,
} from '@/desginer/designComponents/Common';

export const StackItemComponentSettings = () => {
  const { style } = useNode<Partial<StackItemProps>>((node) => ({
    style: node.data.props.style,
  }));

  return (
    <>
      <FlexboxStyleProps style={style} defaultExpanded={true} />
      <PaddingMarginStyleProps style={style} defaultExpanded={true} />
    </>
  );
};
