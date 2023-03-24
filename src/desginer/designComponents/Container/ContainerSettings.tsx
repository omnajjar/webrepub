import { useNode } from '@craftjs/core';

import {
  FlexboxStyleProps,
  PaddingMarginStyleProps,
} from '@/desginer/designComponents/Common';
import { ContainerComponentProps } from '@/desginer/designComponents/Container';

export const ContainerComponentSettings = () => {
  const { style } = useNode<Partial<ContainerComponentProps>>((node) => ({
    style: node.data.props.style,
  }));

  return (
    <>
      <FlexboxStyleProps style={style} defaultExpanded={true} />
      <PaddingMarginStyleProps style={style} defaultExpanded={true} />
    </>
  );
};
